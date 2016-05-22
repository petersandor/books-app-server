/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /bookshelves              ->  index
 * POST    /bookshelves              ->  create
 * GET     /bookshelves/:id          ->  show
 * PUT     /bookshelves/:id          ->  update
 * DELETE  /bookshelves/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Bookshelf = sqldb.Bookshelf;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Bookshelfs
exports.index = function(req, res) {
  Bookshelf.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Bookshelf from the DB
exports.show = function(req, res) {
  Bookshelf.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Bookshelf in the DB
exports.create = function(req, res) {
  Bookshelf.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Bookshelf in the DB
exports.update = function(req, res) {
  
  if(req.body.id){
    delete req.body.id;
  }
  Bookshelf.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Bookshelf from the DB
exports.destroy = function(req, res) {
  Bookshelf.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

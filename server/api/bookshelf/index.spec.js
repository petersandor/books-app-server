'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var bookshelfCtrlStub = {
  index: 'bookshelfCtrl.index',
  show: 'bookshelfCtrl.show',
  create: 'bookshelfCtrl.create',
  update: 'bookshelfCtrl.update',
  destroy: 'bookshelfCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var bookshelfIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './bookshelf.controller': bookshelfCtrlStub
});

describe('Bookshelf API Router:', function() {

  it('should return an express router instance', function() {
    bookshelfIndex.should.equal(routerStub);
  });

  describe('GET /bookshelves', function() {

    it('should route to bookshelf.controller.index', function() {
      routerStub.get
        .withArgs('/', 'bookshelfCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /bookshelves/:id', function() {

    it('should route to bookshelf.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'bookshelfCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /bookshelves', function() {

    it('should route to bookshelf.controller.create', function() {
      routerStub.post
        .withArgs('/', 'bookshelfCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /bookshelves/:id', function() {

    it('should route to bookshelf.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'bookshelfCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /bookshelves/:id', function() {

    it('should route to bookshelf.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'bookshelfCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /bookshelves/:id', function() {

    it('should route to bookshelf.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'bookshelfCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

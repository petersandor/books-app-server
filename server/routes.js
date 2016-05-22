/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import cors from 'cors';

var allowCrossDomain = function(req, res, next) {
    if ('OPTIONS' == req.method) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      res.send(200);
    } else {
      next();
    }
};

module.exports = function(app) {

  // Allow access to backend API running on different port
  app.use(cors({
    origin: 'http://localhost:2368'
  }));

  // Insert routes below
  app.use('/api/books', require('./api/book'));
  app.use('/api/bookshelves', require('./api/bookshelf'));
  
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));
  
  app.use('/api/things', require('./api/thing'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth)/*')
   .get(errors[404]);

};

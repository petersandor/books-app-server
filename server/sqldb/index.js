/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Book = db.sequelize.import('../api/book/book.model');
db.Bookshelf = db.sequelize.import('../api/bookshelf/bookshelf.model');
db.User = db.sequelize.import('../api/user/user.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');

module.exports = db;

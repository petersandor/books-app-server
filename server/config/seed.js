/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var User = sqldb.User;
var Bookshelf = sqldb.Bookshelf;
var Book = sqldb.Book;

User.sync()
  .then(function() {
    return User.destroy({ where: {} });
  })
  .then(function() {
    User.bulkCreate([{
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    }])
    .then(function() {
      console.log('finished populating users');
    });
  });
 
Bookshelf.sync({ force : true })
  .then(function() {
    return Bookshelf.destroy({ where: {} });
  })
  .then(function() {
    Bookshelf.bulkCreate([{
      name: 'Books to read before you die',
      description: 'Most interesting books in the world',
      books: [1, 2, 3, 4]
    }, {
      name: 'Books to not read while you live',
      description: 'Dont even',
      books: [2, 2, 3, 4]
    }, {
      name: 'Random books',
      description: 'Why not lol',
      books: [3, 2, 3, 4]
    }, {
      name: 'Summer books',
      description: 'For when you want to read outside',
      books: [4, 2, 3, 4]
    }])
    .then(function() {
      console.log('finished populating bookshelves');
    });
  });
  
Book.sync({ force : true })
  .then(function() {
    return Book.destroy({ where: {} });
  })
  .then(function() {
    Book.bulkCreate([{
      title: 'Some epic book',
      authors: [
        'Some guy',
        'Another one'
      ]
    }, {
      title: 'Lolz book',
      authors: [
        'Randoms',
        'No one else'
      ]
    }, {
      title: 'Harry Potter',
      authors: [
        'JK ROWLING'
      ]
    }, {
      title: 'HOW NOT TO DIE',
      authors: [
        'DR MICHAEL GREGER'
      ]
    }, {
      title: 'A guide to practical Anarchy',
      authors: [
        'Stefan Molyneux'
      ]
    }, {
      title: 'Handbook of human ownership',
      authors: [
        'Stefan Molyneux'
      ]
    }, {
      title: 'Peaceful parenting',
      authors: [
        'Stefan Molyneux'
      ]
    }])
    .then(function() {
      console.log('finished populating books');
    });
  });
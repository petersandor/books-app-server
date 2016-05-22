'use strict';

var app = require('../..');
var request = require('supertest');

var newBookshelf;

describe('Bookshelf API:', function() {

  describe('GET /bookshelves', function() {
    var bookshelfs;

    beforeEach(function(done) {
      request(app)
        .get('/bookshelves')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          bookshelfs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      bookshelfs.should.be.instanceOf(Array);
    });

  });

  describe('POST /bookshelves', function() {
    beforeEach(function(done) {
      request(app)
        .post('/bookshelves')
        .send({
          name: 'New Bookshelf',
          info: 'This is the brand new bookshelf!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newBookshelf = res.body;
          done();
        });
    });

    it('should respond with the newly created bookshelf', function() {
      newBookshelf.name.should.equal('New Bookshelf');
      newBookshelf.info.should.equal('This is the brand new bookshelf!!!');
    });

  });

  describe('GET /bookshelves/:id', function() {
    var bookshelf;

    beforeEach(function(done) {
      request(app)
        
        .get('/bookshelves/' + newBookshelf.id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          bookshelf = res.body;
          done();
        });
    });

    afterEach(function() {
      bookshelf = {};
    });

    it('should respond with the requested bookshelf', function() {
      bookshelf.name.should.equal('New Bookshelf');
      bookshelf.info.should.equal('This is the brand new bookshelf!!!');
    });

  });

  describe('PUT /bookshelves/:id', function() {
    var updatedBookshelf

    beforeEach(function(done) {
      request(app)
        
        .put('/bookshelves/' + newBookshelf.id)
        .send({
          name: 'Updated Bookshelf',
          info: 'This is the updated bookshelf!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBookshelf = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBookshelf = {};
    });

    it('should respond with the updated bookshelf', function() {
      updatedBookshelf.name.should.equal('Updated Bookshelf');
      updatedBookshelf.info.should.equal('This is the updated bookshelf!!!');
    });

  });

  describe('DELETE /bookshelves/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        
        .delete('/bookshelves/' + newBookshelf.id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when bookshelf does not exist', function(done) {
      request(app)
        
        .delete('/bookshelves/' + newBookshelf.id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});

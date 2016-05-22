/**
 * Bookshelf model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Bookshelf = require('../../sqldb').Bookshelf;
var BookshelfEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BookshelfEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Bookshelf.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    
    BookshelfEvents.emit(event + ':' + doc.id, doc);
    BookshelfEvents.emit(event, doc);
    done(null);
  }
}

module.exports = BookshelfEvents;

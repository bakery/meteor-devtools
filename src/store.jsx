const EventEmitter = require('events').EventEmitter,
      Dispatcher = require('./dispatcher'),
      Constants = require('./constants'),
      _ = require('underscore');

var data = [];

const Store = Object.assign(EventEmitter.prototype, {
  data: [],

  getState : function(){
    return this.data;
  },

  addTrace : function(trace){
    this.data.push(_.extend({},trace,{
      _id : _.uniqueId('trace')
    }));
    this.emit('change');
  },

  clear : function(){
    this.data = [];
    this.emit('change');
  }
});

Dispatcher.register(function(action){
  switch(action.type){
    case Constants.NEW_TRACE:
      Store.addTrace(action.data);
      break;
    case Constants.TOGGLE_TRACE_EXTEND:
      Store.toggleTraceExtension(action.data);
      break;
    case Constants.CLEAR_LOGS:
      Store.clear();
      break;
  }
});

module.exports = Store;
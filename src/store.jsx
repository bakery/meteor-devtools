import {EventEmitter} from 'events';
import Dispatcher from './dispatcher';
import Constants from './constants';
import _ from 'underscore';

let data = [];

const Store = Object.assign(EventEmitter.prototype, {
  data: [],

  getState(){
    return this.data;
  },

  addTrace(trace){
    this.data.push(_.extend({},trace,{
      _id : _.uniqueId('trace')
    }));
    this.emit('change');
  },

  clear(){
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

export default Store;
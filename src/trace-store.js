import {EventEmitter} from 'events';
import Dispatcher from './dispatcher';
import Constants from './constants';
import _ from 'underscore';
import TraceProcessor from './trace-processor';
import FilterStore from './filter-store';
import TraceFilter from './trace-filter';

let data = [];

const Store = Object.assign(EventEmitter.prototype, {
  data: [],

  getState(){
    let filters = FilterStore.getState();
    return TraceFilter.filterTraces(
      TraceProcessor.processTraces(this.data), filters);
  },

  transformMessage(message, isOutbound) {
    return {
      message : message,
      isOutbound : isOutbound,
      _id : _.uniqueId('trace'),
      _timestamp : _.now()
    };
  },

  addTrace(item){
    this.data.push(
      this.transformMessage(JSON.parse(item.jsonString), item.isOutbound)
    );
    if(JSON.parse(item.jsonString).msg === 'ping' || JSON.parse(item.jsonString).msg === 'pong'){
      console.log('adding ping');
    }
    this.emit('change');
  },

  clear(){
    this.data = [];
    this.emit('change');
  },

  refresh(){
    this.emit('change');
  }

});

Dispatcher.register(function(action){
  switch(action.type){
    case Constants.NEW_TRACE:
      Store.addTrace(action.data);
      break;
    case Constants.CLEAR_LOGS:
      Store.clear();
    case Constants.FILTER_ON:
    case Constants.FILTER_OFF:
      Store.refresh();
      break;
  }
});

export default Store;
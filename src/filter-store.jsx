import {EventEmitter} from 'events';
import Dispatcher from './dispatcher';
import Constants from './constants';
import _ from 'underscore';

const FilterStore = {
  filters: [],

  getState(){
    return this.filters;
  },

  addFilter(filter){
      _.isArray(filter) ? 
        this.filters = this.filters.concat(filter) : 
        this.filters.push(filter);
  },

  removeFilter(filter){
    _.isArray(filter) ? 
      this.filters = _.difference(this.filters, filter) :
      this.filters = _.without(this.filters, filter) ;
  }
};

Dispatcher.register(function(action){
  switch(action.type){
    case Constants.FILTER_ON:
      FilterStore.addFilter(action.data);
      break;
    case Constants.FILTER_OFF:
      FilterStore.removeFilter(action.data);
      break;
  }
});

export default FilterStore;
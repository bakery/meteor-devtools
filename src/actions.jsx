import Dispatcher from './dispatcher';
import Constants from './constants';
import  _ from 'underscore';

module.exports = {
  addTrace(data){
    let isValid = data && data.messageJSON && 
      typeof data.isOutbound !== 'undefined';

    if(isValid){
      let d = JSON.parse(data.messageJSON);  
      d = _.isArray(d) ? d : [d];

      _.each(d, function(m){
        m = _.isString(m) ? JSON.parse(m) : m;
        Dispatcher.dispatch({
          type : Constants.NEW_TRACE,
          data : {
            jsonString : JSON.stringify(m),
            isOutbound : data.isOutbound
          }
        });
      });
    }
  },
  
  clearLogs(){
    Dispatcher.dispatch({
      type : Constants.CLEAR_LOGS
    });
  },

  debug(message){
    Dispatcher.dispatch({
      type : Constants.DEBUG,
      data : message
    });
  },

  addFilter(filter){
    Dispatcher.dispatch({
      type : Constants.FILTER_ON,
      data : filter
    });
  },

  removeFilter(filter){
    Dispatcher.dispatch({
      type : Constants.FILTER_OFF,
      data : filter
    });
  }
};
import Dispatcher from './dispatcher';
import Constants from './constants';
import  _ from 'underscore';

let compactJSONString = (d, maxLength) => {
  var str  = JSON.stringify(d);
  if(str.length <= maxLength){
    return str;
  } else { 
    var postFix = ' ... }';
    return [str.substr(0,maxLength - postFix.length),
      postFix].join('');
  }
};

let unescapeBackSlashes = (str) => {
  return str.replace(/\\"/g, '"');
};

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
            jsonString : unescapeBackSlashes(JSON.stringify(m)),
            compactJSONString : 
              unescapeBackSlashes(compactJSONString(m, 50)),
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
  } 
};
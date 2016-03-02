import * as types from '../constants/action-types'
import _ from 'underscore'
import Analytics from '../lib/analytics'

export function addTrace(trace){
  return { 
    type: types.NEW_TRACE, 
    trace : {
      message : trace.message,//JSON.parse(trace.jsonString),
      isOutbound : trace.isOutbound,
      stackTrace : trace.stackTrace,
      _id : _.uniqueId('trace'),
      _timestamp : _.now()
    } 
  }
}

export function clearLogs(){
  Analytics.trackEvent('ddp', 'traces:clear');
  return { type: types.CLEAR_LOGS }
}
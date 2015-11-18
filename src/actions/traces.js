import * as types from '../constants/action-types'
import _ from 'underscore'

export function addTrace(trace){
  return { 
    type: types.NEW_TRACE, 
    trace : {
      message : trace.message,//JSON.parse(trace.jsonString),
      isOutbound : trace.isOutbound,
      _id : _.uniqueId('trace'),
      _timestamp : _.now()
    } 
  }
}

export function clearLogs(){
  return { type: types.CLEAR_LOGS }
}
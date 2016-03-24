import { NEW_TRACE, CLEAR_LOGS } from '../constants/action-types'


export default function traces(state = [], action){
  switch(action.type){
    case NEW_TRACE:
       return [...state, action.trace]
    case CLEAR_LOGS:
      return []
    default:
      return state
  }
}
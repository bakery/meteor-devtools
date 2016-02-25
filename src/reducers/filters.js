import { TOGGLE_FILTER } from '../constants/action-types'

const initialState = {
  'PingPong' : {
    operations: ['ping','pong'],
    enabled: false
  },
  'Subscriptions' : {
    operations: ['sub','ready', 'added','removed', 'changed'],
    enabled: true
  },
  'Methods' : {
    operations: ['method','result', 'updated'],
    enabled: true
  },
  'Connect' : {
    operations: ['connect'],
    enabled: false
  }
};

export default function traces(state = initialState, action){
  switch(action.type){
    case TOGGLE_FILTER:
      return Object.assign({}, state, {
        [action.filter] : Object.assign({}, state[action.filter], {
          enabled : !state[action.filter].enabled
        })
      })
    default:
      return state
  }
}
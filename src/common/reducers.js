import { SET_TAB_INDEX } from './constants'

export default {
  tabIndex (state = 0, action) {
    switch(action.type){
      case SET_TAB_INDEX:
        return action.index;
      default:
        return state;
    }
  },
};
import { SET_TAB_INDEX, MINIMONGO_TAB_INDEX } from './constants'
import { 
  SET_MINIMONGO_COLLECTION_SELECTION,
  SET_MINIMONGO_COLLECTION_AND_QUERY
} from '../plugins/minimongo/constants'

export default {
  tabIndex (state = 0, action) {
    switch(action.type){
      case SET_TAB_INDEX:
        return action.index;
      case SET_MINIMONGO_COLLECTION_SELECTION:
        return MINIMONGO_TAB_INDEX;
      case SET_MINIMONGO_COLLECTION_AND_QUERY:
        return MINIMONGO_TAB_INDEX;
      default:
        return state;
    }
  },
};
import { 
  SET_MINIMONGO_COLLECTIONS
} from '../constants'
import Immutable from 'immutable'

export default {
  minimongoCollections (state = Immutable.fromJS({}), action) {
    switch(action.type){
      case SET_MINIMONGO_COLLECTIONS:
        return Immutable.fromJS(action.data);
      default:
        return state;
    }
  }
};
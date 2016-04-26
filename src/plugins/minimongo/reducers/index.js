import { 
  SET_MINIMONGO_COLLECTIONS,
  CHANGE_COLLECTION_SELECTION
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
  },
  minimongoCurrentSelection (state = Immutable.fromJS(null), action) {
    switch(action.type){
      case CHANGE_COLLECTION_SELECTION:
        return Immutable.fromJS(action.collectionName);
      default:
        return state;
    }
  }
};
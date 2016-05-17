import { 
  SET_MINIMONGO_COLLECTION_DATA,
  SET_MINIMONGO_COLLECTION_SELECTION,
  SET_MINIMONGO_COLLECTION_QUERY,
  SET_MINIMONGO_COLLECTION_AND_QUERY,
} from '../constants'
import Immutable from 'immutable'

export default {
  minimongoCollectionData (state = Immutable.fromJS({}), action) {
    switch(action.type){
      case SET_MINIMONGO_COLLECTION_DATA:
        return Immutable.fromJS(action.data);
      default:
        return state;
    }
  },
  minimongoCollectionSelection (state = Immutable.fromJS(null), action) {
    switch(action.type){
      case SET_MINIMONGO_COLLECTION_SELECTION:
      case SET_MINIMONGO_COLLECTION_AND_QUERY:
        return Immutable.fromJS(action.collectionName);
      default:
        return state;
    }
  },
  minimongoCollectionQuery (state = Immutable.Map(), action) {
    switch(action.type){
      case SET_MINIMONGO_COLLECTION_QUERY:
      case SET_MINIMONGO_COLLECTION_AND_QUERY:
        return state.set(action.collectionName, action.query);
      default:
        return state;
    }
  },
};
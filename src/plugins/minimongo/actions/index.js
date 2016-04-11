import { 
  SET_MINIMONGO_COLLECTIONS, 
} from '../constants';

export function setMinimongoCollections(data) {
  return { 
    type: SET_MINIMONGO_COLLECTIONS,
    data: data
  }
}
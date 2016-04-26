import { 
  SET_MINIMONGO_COLLECTIONS, 
  CHANGE_COLLECTION_SELECTION
} from '../constants';

export function setMinimongoCollections(data) {
  return { 
    type: SET_MINIMONGO_COLLECTIONS,
    data: data
  }
}

export function changeCollectionSelection(collectionName) {
  return {
    type: CHANGE_COLLECTION_SELECTION,
    collectionName: collectionName
  }
}
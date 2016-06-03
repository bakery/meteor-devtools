import { 
  SET_MINIMONGO_COLLECTION_DATA, 
  SET_MINIMONGO_COLLECTION_SELECTION,
  SET_MINIMONGO_COLLECTION_QUERY,
  SET_MINIMONGO_COLLECTION_AND_QUERY
} from '../constants';

export function setCollectionData(data) {
  return { 
    type: SET_MINIMONGO_COLLECTION_DATA,
    data: data
  }
}

export function setCollectionSelection(collectionName) {
  return {
    type: SET_MINIMONGO_COLLECTION_SELECTION,
    collectionName: collectionName
  }
}

export function setCollectionQuery(collectionName, query) {
  return {
    type: SET_MINIMONGO_COLLECTION_QUERY,
    collectionName: collectionName,
    query: query
  }
}

export function setCollectionAndQuery(collectionName, query) {
  return {
    type: SET_MINIMONGO_COLLECTION_AND_QUERY,
    collectionName: collectionName,
    query: query
  }
}
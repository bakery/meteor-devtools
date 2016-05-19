import { SET_TAB_INDEX } from './constants'

export function setTabIndex(data) {
  return { 
    type: SET_TAB_INDEX,
    index: data
  }
}
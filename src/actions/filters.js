import { TOGGLE_FILTER } from '../constants/action-types'
import _ from 'underscore'

export function toggleFilter(filter){
  return { 
    type: TOGGLE_FILTER,
    filter: filter 
  }
}
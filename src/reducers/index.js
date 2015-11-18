import { combineReducers } from 'redux'
import traces from './traces'
import filters from './filters'

export default combineReducers({
  traces,
  filters
})
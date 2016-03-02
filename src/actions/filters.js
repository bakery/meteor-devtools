import { TOGGLE_FILTER } from '../constants/action-types'
import _ from 'underscore'
import Analytics from '../lib/analytics'

export function toggleFilter(filter) {
  Analytics.trackEvent('ddp', 'filter:toggle', filter);
  return { 
    type: TOGGLE_FILTER,
    filter: filter 
  }
}
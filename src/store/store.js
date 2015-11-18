import { createStore, compose } from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialState){
  if(__DEVTOOLS__){
    const { devTools, persistState }  = require('redux-devtools') 

    let createDevelopmentStore = compose(
      devTools(),
      // Lets you write ?debug_session=<name> in address bar to persist debug sessions
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);

    return createDevelopmentStore(rootReducer, initialState);
  } else {
    return createStore(rootReducer, initialState);
  }
}
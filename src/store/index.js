import { createStore, compose } from 'redux'
import rootReducer from '../reducers'

const finalCreateStore = compose(
  // XX: work with Redux Devtools Chrome extension
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const configureStore = function(initialState){
  return finalCreateStore(rootReducer, initialState);
}

const __store = configureStore();

module.exports = __store
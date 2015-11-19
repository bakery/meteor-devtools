import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Bridge from './bridge';
import AppContainer from './containers/app'
import configureStore from './store/store'
import { addTrace, clearLogs } from './actions/traces'

const store = configureStore()

let node = document.querySelector('.app-container');
let theApp = null;

try {
  Bridge.setup(() => {
    node.innerHTML = ''
    
    render(<Provider store={store}><AppContainer /></Provider> ,node)

    if(__DEVTOOLS__){
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react')
      render(
        <div>
          <Provider store={store}>
            <AppContainer />
          </Provider>
          <DebugPanel bottom right top>
            <DevTools monitor={LogMonitor} store={store} />
          </DebugPanel>
        </div>
        , node
      )
    }

  }, (error, trace) => {
    if(!error){
      store.dispatch(addTrace(trace));
    }
  }, () => store.dispatch(clearLogs()));
} catch(e) {
  console.error('global error', e);
}
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/app-container';
import Bridge from './bridge';
import Actions from './actions';

let node = document.querySelector('.app-container');

Bridge.setup(() => {
  ReactDOM.unmountComponentAtNode(node);
  node.innerHTML = '';
  ReactDOM.render(<AppContainer />, node);
}, (message) => console.error(message));
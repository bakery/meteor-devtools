const React = require('react'),
      ReactDOM = require('react-dom'),
      AppContainer = require('./components/app-container'),
      Bridge = require('./bridge'),
      Actions = require('./actions');

var node = document.querySelector('.app-container');

Bridge.setup(function(){
  ReactDOM.unmountComponentAtNode(node);
  node.innerHTML = '';
  ReactDOM.render(<AppContainer />, node);
}, function(message){
  console.error(message);
});
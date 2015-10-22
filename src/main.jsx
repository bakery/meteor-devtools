//document.body.style['background-color']='red';

const React = require('react'),
      ReactDOM = require('react-dom'),
      AppContainer = require('./components/app-container'),
      Bridge = require('./bridge');


var theApp;

Bridge.setup(function(){
  theApp = ReactDOM.render(
    <AppContainer />,
    document.querySelector('.app-container')
  );
}, function(message){
  theApp && theApp.showErrorMessage(message);
});
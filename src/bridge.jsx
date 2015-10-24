const Actions = require('./actions'),
      Dispatcher = require('./dispatcher'),
      Constants = require('./constants');

var backgroundPageConnection;
var debug = function(message){
  backgroundPageConnection && backgroundPageConnection.postMessage({
    name: 'debug',
    message: message
  });
};

Dispatcher.register(function(action){
  switch(action.type){
    case Constants.DEBUG:
      debug(action.data);
      break;
  }
});

module.exports = {
  setup : function(callback, onError){

    var onGotMessage = function(message){
      if(message && message.eventType === 'trace'){
        Actions.addTrace(message.data);
      }
    };

    if(chrome && chrome.devtools){
      var chromeSetup = function(){
        // Create a connection to the background page
        backgroundPageConnection = chrome.runtime.connect({
          name: 'panel'
        });

        backgroundPageConnection.postMessage({
          name: 'init',
          tabId: chrome.devtools.inspectedWindow.tabId
        });

        backgroundPageConnection.onMessage.addListener(function(msg) {
          onGotMessage.call(this, msg);
          onError(JSON.stringify(msg.data));
        });
      };

      var pageSetup = function(){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', chrome.extension.getURL('/scripts/inject.js'), false);
        xhr.send();

        chrome.devtools.inspectedWindow.eval(xhr.responseText);
      };

      chrome.devtools.network.onNavigated.addListener(function(){
        pageSetup.call(this);
        Actions.clearLogs();
      });

      chromeSetup.call(this);
      pageSetup.call(this);
    } else {
      // inside standalone web app
      setInterval(function(){
        Actions.addTrace({
          messageJSON: '{ "msg": "ping"}',
          isOutbound: true
        });
      },1000);
    }

    callback && callback.call(this);
  }
};
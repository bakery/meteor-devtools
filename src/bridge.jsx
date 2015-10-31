import Actions from './actions';
import Dispatcher from './dispatcher';
import Constants from './constants';
import DDPMessageGenerator from './ddp-generator';

let backgroundPageConnection;
let debug = (message) => {
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

export default {
  setup(callback, onError){

    var onGotMessage = function(message){
      if(message && message.eventType === 'trace'){
        Actions.addTrace(message.data);
      }
    };

    if(chrome && chrome.devtools){
      let chromeSetup = function(){
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

      let pageSetup = () => {
        let xhr = new XMLHttpRequest();
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
          messageJSON: DDPMessageGenerator.generate(),
          isOutbound: true
        });
      },1000);
    }

    callback && callback.call(this);
  }
};
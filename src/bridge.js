import DDPMessageGenerator from './lib/ddp-generator';
import _ from 'underscore'

let backgroundPageConnection;
let debug = (message) => {
  backgroundPageConnection && backgroundPageConnection.postMessage({
    name: 'debug',
    message: message
  });
};

export default {

  openResource(url, lineNumber, callback){
    if(chrome && chrome.devtools){
      chrome.devtools.panels.openResource(url, lineNumber, callback);
    }
  },

  setup(onReady, callback, onReload){

    var onGotMessage = function(message) {
      if(message && message.eventType === 'trace'){
        let data = message.data;
        let isValid = data && data.messageJSON && 
          typeof data.isOutbound !== 'undefined';
        
        if(!isValid){
          return;
        }

        let d = JSON.parse(data.messageJSON);  
        d = _.isArray(d) ? d : [d];

        _.each(d, function(m){
          m = _.isString(m) ? JSON.parse(m) : m;

          callback && callback.call(this, null, {
            message: m,
            isOutbound: data.isOutbound,
            stackTrace: data.stackTrace
          });
        });
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
        });
      };

      let injectScript = (scriptUrl) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', chrome.extension.getURL(scriptUrl), false);
        xhr.send();
        chrome.devtools.inspectedWindow.eval(xhr.responseText);
      };

      let pageSetup = () => {
        injectScript('/scripts/lib/error-stack-parser.js');
        injectScript('/scripts/inject.js');
      };

      chromeSetup.call(this);
      pageSetup.call(this);

      chrome.devtools.network.onNavigated.addListener(function(){
        pageSetup.call(this);
        onReload && onReload.call(this);
      });
    } else {
      // inside standalone web app
      setInterval(function(){
        callback && callback.call(this, null, {
          message: DDPMessageGenerator.generate(),
          isOutbound: true
        })
      },1000);
    }

    onReady && onReady.call(this);
  }
};
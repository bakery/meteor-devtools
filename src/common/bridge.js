import _ from 'underscore';

let __messageCallbacks = [];
let __pageReloadCallbacks = [];

const __registerCallback = (callback, callbackList) => {
  if (!callback) {
    return;
  }

  const existingCallback = _.find(callbackList, (c) => c === callback);
  if (existingCallback) {
    return;
  }

  callbackList.push(callback);
};

const __unregisterCallback = (callback, callbackList) => {
  if (!callback) {
    return;
  }
  callbackList = _.filter(callbackList, (c) => c !== callback);  
};

export default {
  registerMessageCallback(callback) {
    __registerCallback(callback, __messageCallbacks);
  },

  removeMessageCallback(callback) {
    __unregisterCallback(callback, __messageCallbacks);
  },

  registerPageReloadCallback(callback) {
    __registerCallback(callback, __pageReloadCallbacks);
  },

  removePageReloadCallback(callback) {
    __unregisterCallback(callback, __pageReloadCallbacks);
  },

  openResource(url, lineNumber, callback){
    if(chrome && chrome.devtools){
      chrome.devtools.panels.openResource(url, lineNumber, callback);
    }
  },

  sendMessageToThePage(message) {
    if(chrome && chrome.devtools){
      chrome.devtools.inspectedWindow.eval(
        `__meteor_devtools_receiveMessage(${JSON.stringify(message)})`
      );
    }
  },

  setup(){
    if(chrome && chrome.devtools){
      let chromeSetup = function(){
        // Create a connection to the background page
        const backgroundPageConnection = chrome.runtime.connect({
          name: 'panel'
        });

        backgroundPageConnection.postMessage({
          name: 'init',
          tabId: chrome.devtools.inspectedWindow.tabId
        });

        backgroundPageConnection.onMessage.addListener(function(msg) {
          _.each(__messageCallbacks, (mc) => mc && mc.call(this, null, msg));
        });
      };

      let injectScript = (scriptUrl) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', chrome.extension.getURL(scriptUrl), false);
        xhr.send();
        chrome.devtools.inspectedWindow.eval(xhr.responseText);
      };

      let pageSetup = () => injectScript('/build/inject.js');
    
      chromeSetup.call(this);
      pageSetup.call(this);

      chrome.devtools.network.onNavigated.addListener(function(){
        pageSetup.call(this);
        _.each(__pageReloadCallbacks, (prc) => prc && prc.call(this));
      });
    }
  }
};
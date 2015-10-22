const Actions = require('./actions');

module.exports = {
  setup : function(callback, onError){

    var onGotMessage = function(message){
      if(message && message.eventType === 'trace'){
        Actions.addTrace(message.data);
      } else {
        onError.call(this, 
          ['Unknown message:',JSON.stringify(message)].join('<br>')
        );
      }
    };

    if(chrome && chrome.devtools){
      
      var chromeSetup = function(){
        // Create a connection to the background page
        var backgroundPageConnection = chrome.runtime.connect({
          name: 'panel'
        });

        backgroundPageConnection.postMessage({
          name: 'init',
          tabId: chrome.devtools.inspectedWindow.tabId
        });

        backgroundPageConnection.onMessage.addListener(function(msg) {
          onGotMessage.call(this, msg);
          onError.call(this, JSON.stringify(msg));
        });
      };

      chrome.devtools.network.onNavigated.addListener(function(){
        chromeSetup.call(this);
      });

      chromeSetup.call(this);
    } else {
      // inside standalone web app
      setInterval(function(){
        Actions.addTrace({
          messageJSON: '{ "msg": "ping"}',
          isOutbound: true
        });
      },5000);
    }

    callback && callback.call(this);
  }
};
(function(){
  var setup = function(){
    var talkToExtension = function(eventType, data){
      window.postMessage({
        eventType : eventType, 
        data: data, 
        source: 'ddp-monitor-extension'
      }, '*'); 
    }; 

    var oldSend = WebSocket.prototype.send; 
    WebSocket.prototype.send = function(){
      oldSend.apply(this,arguments);
      talkToExtension('sent', JSON.parse(arguments[0])); 
    }; 

    Meteor.connection._stream.on('message', function(){
      talkToExtension('received', JSON.parse(arguments[0])); 
    });
  };

  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      if(typeof Meteor !== 'undefined'){
        setup();
      }
    } 
  }, 10);
})();
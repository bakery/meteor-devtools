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
      talkToExtension('trace', {
        messageJSON : arguments[0],
        isOutbound : true 
      }); 
    }; 

    Meteor.connection._stream.on('message', function(){
      talkToExtension('trace', {
        messageJSON : arguments[0],
        isOutbound : false
      }); 
    });
  };

  var readyStateCheckInterval = setInterval(function() {
    var isMeteorDefined = typeof Meteor !== 'undefined';
    if (document.readyState === 'complete' || isMeteorDefined) {
      clearInterval(readyStateCheckInterval);
      if(isMeteorDefined){
        setup();
      }
    } 
  }, 10);
})();
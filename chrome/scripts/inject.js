(function(){
  var setup = function(){

    console.error('setting stuff up');

    var talkToExtension = function(eventType, data){
      console.error('sending message',eventType,data);
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
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      if(typeof Meteor !== 'undefined'){
        setup();
      }
    } 
  }, 10);
})();
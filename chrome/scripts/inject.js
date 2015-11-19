(function(){
  var setup = function(){
    var getStackTrace = function(stackTraceLimit){
      var originalStackTraceLimit = Error.stackTraceLimit;

      try {
        Error.stackTraceLimit = stackTraceLimit || 15;    
        return ErrorStackParser.parse(new Error);
      } finally {
        console.error('resetting stackTrace');
        Error.stackTraceLimit = originalStackTraceLimit;
      }
    };

    var talkToExtension = function(eventType, data){
      window.postMessage({
        eventType : eventType, 
        data: data, 
        source: 'ddp-monitor-extension'
      }, '*'); 
    }; 

    var grabStackAndTalkToExtension = function(message){
      var stackTrace = getStackTrace(15);

      if(stackTrace && stackTrace.length !== 0){
        // XX: clean up first 2 traces since they refer to 
        // account for getStackTrace and grabStackAndTalkToExtension calls
        stackTrace.splice(0,2);
      }

      message.stackTrace = stackTrace;
      talkToExtension('trace', message);
    };

    var oldSend = WebSocket.prototype.send; 
    WebSocket.prototype.send = function(){
      oldSend.apply(this,arguments);
      grabStackAndTalkToExtension({
        messageJSON : arguments[0],
        isOutbound : true 
      });
    }; 

    Meteor.connection._stream.on('message', function(){
      grabStackAndTalkToExtension({
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
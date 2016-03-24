import ErrorStackParser from 'error-stack-parser';

module.exports = {
  setup : (talkToExtension) => {
    var getStackTrace = function(stackTraceLimit){
      var originalStackTraceLimit = Error.stackTraceLimit;
      try {
        Error.stackTraceLimit = stackTraceLimit || 15;    
        return ErrorStackParser.parse(new Error);
      } finally {
        Error.stackTraceLimit = originalStackTraceLimit;
      }
    };
    
    var grabStackAndTalkToExtension = function(message){
      var stackTrace = getStackTrace(15);

      if(stackTrace && stackTrace.length !== 0){
        // XX: clean up first 2 traces since they refer to 
        // account for getStackTrace and grabStackAndTalkToExtension calls
        stackTrace.splice(0,2);
      }

      message.stackTrace = stackTrace;
      talkToExtension('ddp-trace', message);
    };

    var oldSend = Meteor.connection._stream.send; 
    Meteor.connection._stream.send = function(){
      oldSend.apply(this, arguments);
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
  }
};

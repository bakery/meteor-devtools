import _ from 'underscore';

const randomObject = () => {
  let result = {};
  _.each(_.range(0,_.random(1, 5)), () => {
    result[_.uniqueId('field')] =
      _.uniqueId('value'); 
  }); 
  return result;
};

const randomArray = () => {
  return _.map(_.range(0,_.random(1, 5)), () => {
    return _.uniqueId('item')
  });
};

export default {
  
  DDPMessages : {
    ping : () => {
      return '{"msg":"ping"}';
    },
    pong : () => {
      return '{"msg":"pong"}';
    },
    changed : () => {
      return JSON.stringify({
        msg : 'changed',
        collection : _.uniqueId('collection'),
        id : _.uniqueId('id'),
        fields : randomObject()
      });
    },
    added : () => {
      return JSON.stringify({
        msg : 'added',
        collection : _.uniqueId('collection'),
        id : _.uniqueId('id'),
        fields : randomObject()
      });
    },
    removed : () => {
      return JSON.stringify({
        msg : 'removed',
        collection : _.uniqueId('collection'),
        id : _.uniqueId('id')
      });
    },
    sub : () => {
      return JSON.stringify({
        msg : 'sub',
        id : _.uniqueId('id'),
        name : _.uniqueId('sub-name'),
        params : randomArray()
      });
    },
    ready : () => {
      return JSON.stringify({
        msg : 'ready',
        subs : randomArray()
      });
    },
    method : () => {
      return JSON.stringify({
        msg : 'method',
        method : _.uniqueId('method'),
        params : randomArray(),
        id : _.uniqueId('id'),
      });
    },
    updated : () => {
      return JSON.stringify({
        msg : 'updated',
        methods : randomArray()
      });
    },
    connect : () => {
      return JSON.stringify({
        msg : 'connect',
        version : _.uniqueId('version'),
        support : randomArray()
      }); 
    },
    result : () => {
      return JSON.stringify({
        msg : 'result',
        id : _.uniqueId('version'),
        result : randomObject()
      });
    },
    resultWithError : () => {
      return JSON.stringify({
        msg : 'result',
        id : _.uniqueId('version'),
        error : randomObject()
      });
    }
  },

  generate (spec) {
    // message spec
    // {
    //  type: <message type defined in DDPMessages>
    // }
    
    if(spec && spec.type){
      return this.DDPMessages[spec.type].call(this);
    } else {
      const supportedMessages = _.keys(this.DDPMessages);
      return this.DDPMessages[
        supportedMessages[_.random(0,supportedMessages.length-1)]
      ].call(this); 
    }
  }
};
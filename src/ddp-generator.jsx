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

const generateMessages = (g, numberOfMessages) => {
  return _.map(_.range(numberOfMessages || 1), function(){
    return g.call(this);
  });
};

export default {
  
  DDPMessages : {
    ping : () => {
      return {msg:'ping'};
    },
    pong : () => {
      return {msg:'pong'};
    },
    changed : (numberOfMessages) => {
      const collectionName = _.uniqueId('collection');
      return generateMessages(() => {
        return {
          msg : 'changed',
          collection : collectionName,
          id : _.uniqueId('id'),
          fields : randomObject()
        };
      }, numberOfMessages)
    },
    added : (numberOfMessages) => {
      const collectionName = _.uniqueId('collection');
      return generateMessages(() => {
        return {
          msg : 'added',
          collection : collectionName,
          id : _.uniqueId('id'),
          fields : randomObject()
        };
      }, numberOfMessages);
    },
    removed : () => {
      return {
        msg : 'removed',
        collection : _.uniqueId('collection'),
        id : _.uniqueId('id')
      };
    },
    sub : () => {
      return {
        msg : 'sub',
        id : _.uniqueId('id'),
        name : _.uniqueId('sub-name'),
        params : randomArray()
      };
    },
    ready : () => {
      return {
        msg : 'ready',
        subs : randomArray()
      };
    },
    method : () => {
      return {
        msg : 'method',
        method : _.uniqueId('method'),
        params : randomArray(),
        id : _.uniqueId('id'),
      };
    },
    updated : () => {
      return {
        msg : 'updated',
        methods : randomArray()
      };
    },
    connect : () => {
      return {
        msg : 'connect',
        version : _.uniqueId('version'),
        support : randomArray()
      }; 
    },
    result : () => {
      return {
        msg : 'result',
        id : _.uniqueId('version'),
        result : randomObject()
      };
    },
    resultWithError : () => {
      return {
        msg : 'result',
        id : _.uniqueId('version'),
        error : randomObject()
      };
    }
  },

  generate (spec) {
    // message spec
    // {
    //  type: <message type defined in DDPMessages>,
    //  numberOfMessages: <number of messages to generate, defaults to 1>
    // }
    
    const supportedMessages = _.keys(this.DDPMessages); 
    const type = (spec && spec.type) ||
      supportedMessages[_.random(0,supportedMessages.length-1)];

    return this.runGenerator(type, spec && spec.numberOfMessages);
  },

  runGenerator : function(type, numberOfMessages){
    const data = this.DDPMessages[type].call(this, numberOfMessages);
    return data.length === 1 ? data[0] : data;
  }
};
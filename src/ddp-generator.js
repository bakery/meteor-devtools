import _ from 'underscore';

let randomObject = () => {
  let result = {};
  _.each(_.range(0,_.random(1, 5)), () => {
    result[_.uniqueId('field')] =
      _.uniqueId('value'); 
  }); 
  return result;
};

let randomArray = () => {
  return _.map(_.range(0,_.random(1, 5)), () => {
    return _.uniqueId('item')
  });
};

let generateMessages = (g, spec = {}) => {
  return _.map(_.range(spec.numberOfMessages || 1), function(){
    return _.extend({}, g.call(this), spec.overrides || {});
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
    changed : (spec) => {
      let collectionName = _.uniqueId('collection');
      return generateMessages(() => {
        return {
          msg : 'changed',
          collection : collectionName,
          id : _.uniqueId('id'),
          fields : randomObject()
        };
      }, spec);
    },
    added : (spec) => {
      const collectionName = _.uniqueId('collection');
      return generateMessages(() => {
        return {
          msg : 'added',
          collection : collectionName,
          id : _.uniqueId('id'),
          fields : randomObject()
        };
      }, spec);
    },
    removed : (spec) => {
      const collectionName = _.uniqueId('collection');
      return generateMessages(() => {
        return {
          msg : 'removed',
          collection : collectionName,
          id : _.uniqueId('id')
        };
      }, spec);
    },
    sub : (spec) => {
      return generateMessages(() => {
        return {
          msg : 'sub',
          id : _.uniqueId('id'),
          name : _.uniqueId('sub-name'),
          params : randomArray()
        };
      }, spec);
    },
    ready : (spec) => {
      return generateMessages(() => {
        return {
          msg : 'ready',
          subs : randomArray()
        };
      }, spec);
    },
    method : (spec) => {
      return generateMessages(() => {
        return {
          msg : 'method',
          method : _.uniqueId('method'),
          params : randomArray(),
          id : _.uniqueId('id')
        };
      }, spec);
    },
    updated : (spec) => {
      return generateMessages(() => {
        return {
          msg : 'updated',
          methods : randomArray()
        };
      }, spec);
    },
    connect : (spec) => {
      return generateMessages(() => {
        return {
          msg : 'connect',
          version : _.uniqueId('version'),
          support : randomArray()
        };
      }, spec); 
    },
    result : (spec) => {
      return generateMessages(() => {
        return {
          msg : 'result',
          id : _.uniqueId('version'),
          result : randomObject()
        };
      }, spec);
    },
    resultWithError : (spec) => {
      return generateMessages(() => {
        return {
          msg : 'result',
          id : _.uniqueId('version'),
          error : randomObject()
        };
      }, spec);
    }
  },

  generate (spec) {
    // message spec
    // {
    //  type: <message type defined in DDPMessages>,
    //  numberOfMessages: <number of messages to generate, defaults to 1>
    //  overrides: <attributes to override on the new message> 
    // }
    
    const supportedMessages = _.keys(this.DDPMessages); 
    const type = (spec && spec.type) ||
      supportedMessages[_.random(0,supportedMessages.length-1)];

    return this.runGenerator(type, spec);
  },

  runGenerator : function(type, spec){
    const data = this.DDPMessages[type].call(this, spec);
    return data.length === 1 ? data[0] : data;
  }
};
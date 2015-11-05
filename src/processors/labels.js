import _ from 'underscore';

const _labels = {
  added : (message) => {
    return _.isArray(message) ?
      `${message.length} items added to ${message[0].collection} collection` : 
      `item added to ${message.collection} collection`;
  },

  removed : (message) => {
    return _.isArray(message) ?
      `${message.length} items removed from ${message[0].collection} collection` :
      `item removed from ${message.collection} collection`;
  },

  changed : (message) => {
    return _.isArray(message) ?
      `${message.length} items changed ${message[0].collection} collection` :
      `item changed in ${message.collection} collection`;
  },

  ping : () => 'ping',
  pong : () => 'pong',
  connect : () => 'connect',
  updated : () => 'updated',
  result : () => 'result',

  sub : (message) => {
    let params = (message.params || []).join(', ')
    return `subscribing to ${message.name} with ${params}`;
  },

  ready : (message) => {
    let subs = (message.subs || []).join(', ')
    return `subscription ready for ${subs}`;
  },

  method : (message) => {
    let params = (message.params || []).join(', ')
    return `calling method ${message.method} with ${params}`;
  }
};

class TraceLabels {
  run(traces) {
    return _.map(traces, (t) => {
      let messageType = _.isArray(t.message) ? 
        t.message[0].msg : t.message.msg;
      let label = _labels[messageType] ? 
        _labels[messageType].call(this,t.message) :
        messageType;
      
      return _.extend(t, { label });
    });
  }
};

export default TraceLabels;
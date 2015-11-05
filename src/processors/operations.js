import _ from 'underscore';

class TraceOperations {
  run(traces) {
    return _.map(traces, (t) => {
      return _.extend(t, { 
        operation : _.isArray(t.message) ? 
          t.message[0].msg : t.message.msg 
      });
    });
  }
};

export default TraceOperations;
import _ from 'underscore';

class TraceMessageSize {
  run(traces) {
    return _.map(traces, (t) => {
      return _.extend(t, { size: JSON.stringify(t.message).length });
    });
  }
};

export default TraceMessageSize;
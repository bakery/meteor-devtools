import _ from 'underscore';

class UknownPublicationWarning {
  check(traces) {
    return _.map(traces, (trace) => {
      if(trace.operation !== 'nosub'){
        return trace;
      }

      const isUknown = trace.message.error &&
        (trace.message.error.error === 404);

      return isUknown ?
        _.extend(trace, {
          warnings : ['unknown-publication']
        }) :
        trace;
    });
  }
};

module.exports = UknownPublicationWarning;
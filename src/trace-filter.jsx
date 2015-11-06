import _ from 'underscore';

export default {
  filterTraces(traces, filters) {
    return _.filter(traces, function(trace){
        return !_.contains(filters, trace.operation);
    });
  }
};
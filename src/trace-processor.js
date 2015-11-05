import _ from 'underscore';
import Groups from './processors/groups';
import Labels from './processors/labels';
import Operations from './processors/operations';

export default {
  processTraces(traces) {
    return _.sortBy(
      _.reduce(this.processors, (ts, processor) => processor.run(ts), traces), 
      (t) => t._timestamp
    );
  },

  filterTraces(traces, filters) {
    return _.filter(traces, function(trace){
        return !_.contains(filters, trace.operation);
    });
  },

  processors : [new Groups(), new Labels(), new Operations()]
};
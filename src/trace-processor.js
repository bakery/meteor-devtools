import _ from 'underscore';
import Groups from './processors/groups';
import Labels from './processors/labels';

export default {
  processTraces(traces) {
    return _.sortBy(
      _.reduce(this.processors, (ts, processor) => processor.run(ts), traces), 
      (t) => t._timestamp
    );
  },

  processors : [new Groups(), new Labels()]
};
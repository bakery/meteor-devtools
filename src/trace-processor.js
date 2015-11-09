import _ from 'underscore';
import Groups from './processors/groups';
import Labels from './processors/labels';
import Operations from './processors/operations';
import Associations from './processors/associations';

export default {
  processTraces(traces) {
    return _.sortBy(
      _.reduce(this.processors, (ts, processor) => processor.run(ts), traces), 
      (t) => t._timestamp
    );
  },

  processors : [
    new Groups(), 
    new Labels(), 
    new Operations(), 
    new Associations()
  ]
};
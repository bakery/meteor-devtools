import _ from 'underscore';
import Groups from './processors/groups';
import Labels from './processors/labels';
import Operations from './processors/operations';
import OperationTypes from './processors/operation-types';
import Associations from './processors/associations';

module.exports = {
  processTraces : function(traces){
    // XX: deep copy
    let copyOfTraces = JSON.parse(JSON.stringify(traces));
    return _.sortBy(
      _.reduce(this.processors, (ts, processor) => processor.run(ts), copyOfTraces),
      (t) => t._timestamp
    );
  },

  processors : [
    new Groups(),
    new Operations(),
    new OperationTypes(), 
    new Associations(),
    new Labels(),
  ]
};
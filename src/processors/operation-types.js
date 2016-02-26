import _ from 'underscore';
import operationTypes from '../constants/operation-types'

class TraceOperationTypes {
  run(traces) {
    const results = _.map(traces, (t) => {
      const operationType = _.find(_.keys(operationTypes), (ot) => {
        return _.contains(operationTypes[ot], t.operation);
      });
      return _.extend(t, { 
        operationType : operationType
      });
    });

    console.error('traces with op types', results);

    return results;
  }
};

export default TraceOperationTypes;
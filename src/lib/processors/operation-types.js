import _ from 'underscore';
import operationTypes from '../../constants/operation-types'

class TraceOperationTypes {
  run(traces) {
    return _.map(traces, (t) => {
      const operationType = _.find(_.keys(operationTypes), (ot) => {
        return _.contains(operationTypes[ot], t.operation);
      });
      return _.extend(t, { 
        operationType : operationType
      });
    });
  }
};

export default TraceOperationTypes;
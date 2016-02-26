import _ from 'underscore';
import operationTypes from './constants/operation-types';

module.exports = {
  computeStats (traces) {
    return {
      inboundMessages: _.reduce(traces, (memo, trace) => {
        return memo + (!trace.isOutbound ? 1 : 0);
      }, 0),
      outboundMessages: _.reduce(traces, (memo, trace) => {
        return memo + (trace.isOutbound ? 1 : 0);
      }, 0),
      messageTypes: _.reduce(_.keys(operationTypes), (mts, ot) => {
        mts[ot] = _.filter(traces, (t) => t.operationType === ot).length     
        return mts; 
      }, {})
    };
  }
};
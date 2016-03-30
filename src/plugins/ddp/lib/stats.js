import _ from 'underscore';
import OperationTypes from '../constants/operation-types';

module.exports = {
  computeStats (traces) {
    return {
      inboundMessages: _.reduce(traces, (memo, trace) => {
        return memo + (!trace.isOutbound ? 1 : 0);
      }, 0),
      outboundMessages: _.reduce(traces, (memo, trace) => {
        return memo + (trace.isOutbound ? 1 : 0);
      }, 0),
      inboundMessagesSize : _.reduce(traces, (memo, trace) => {
        return memo + (!trace.isOutbound ? trace.size : 0);
      }, 0),
      outboundMessagesSize: _.reduce(traces, (memo, trace) => {
        return memo + (trace.isOutbound ? trace.size : 0);
      }, 0),
      messageTypes: {
        methodCalls : _.reduce(traces, (cnt, trace) => {
          return cnt + (trace.operation === 'method' ? 1 : 0);
        }, 0),
        collections : _.reduce(traces, (cnt, trace) => {
          return cnt + (trace.operationType === 'Collections' ? 1 : 0);
        }, 0),
        subscriptions : _.reduce(traces, (cnt, trace) => {
          return cnt + (trace.operation === 'sub' ? 1 : 0);
        }, 0),
      }
    };
  }
};
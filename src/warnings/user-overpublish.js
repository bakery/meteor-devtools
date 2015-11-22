import _ from 'underscore';

class UserOverpublishWarning {
  check(traces) {
    return _.map(traces, (trace) => {
      if(trace.operation !== 'added'){
        return trace;
      }

      let collectionNames = _.uniq(_.pluck(trace.message, 'collection'));
      
      if(collectionNames[0] !== 'users'){
        return trace;
      }

      let message = trace.message[0];
      let flds = message.fields;
      let isOverpublishing = flds && flds.services && 
        (flds.services.password || flds.services.resume);

      return isOverpublishing ? 
        _.extend(trace, {
          warnings : ['user-overpublish']
        }) :
        trace;
    });
  }
};

module.exports = UserOverpublishWarning;
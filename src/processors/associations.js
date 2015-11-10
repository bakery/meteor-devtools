import _ from 'underscore';

class TraceAssociations {
  run(traces) {
    return _.map(traces, (t) => {
      if(t.operation === 'ready'){
        let sub = _.find(traces, (tt) => {
          return tt.operation === 'sub' && 
            _.contains(t.message.subs, tt.message.id)
        });
        if(sub){
          _.extend(t, {
            request : sub
          });
        }
      }

      if(t.operation === 'result'){
        let method = _.find(traces, (tt) => {
          return tt.operation === 'method' &&
            tt.message.msg.id === t.message.msg.id
        });
        
        if(method){
          _.extend(t, {
            request : method
          });
        }
      }

      return t;
    });
  }
};

export default TraceAssociations;
import _ from 'underscore';

class TraceLabels {
  run(traces) {
    return _.map(traces, (t) => {
      let label = t.message.msg;

      if(_.isArray(t.message)){
        // dealing with a grouped message
        const count = t.message.length;
        const operation = _.first(t.message).msg;
        const collection = _.first(t.message).collection;
        label = operation;

        switch(operation){
          case 'added':
            label = `${count} items added to ${collection} collection`;
            break;
          case 'removed':
            label = `${count} items removed from ${collection} collection`;
            break;
          case 'changed':
            label = `${count} items changed in ${collection} collection`;
            break;
        }
      }

      return _.extend(t,{
        label : label
      });
    });
  }
};

export default TraceLabels;
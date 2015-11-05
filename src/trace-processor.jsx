import _ from 'underscore';

export default {
  processTraces(traces) {
    return _.sortBy(
      _.reduce(this.processors, (ts, processor) => processor.call(this,ts), traces), 
      (t) => t._timestamp
    );
  },

  processors : [
    // Message grouping
    // - collection related ops 
    (traces) => {
      const targetMsgs = ['added','changed','removed','updated'];
      const unrelated = 'unrelated';

      // group traces using <collection-msg-direction-time>
      // traces that are not related to collection ops, go
      // to the 'unrelated' group      
      let groups = _.groupBy(traces, (t) => {
        if(t.message.collection && _.contains(targetMsgs, t.message.msg)){
          return [
            t.message.collection, 
            t.message.msg, 
            t.isOutbound,
            // XX: group messages in 10 seconds batches
            Math.floor(t._timestamp/10000),
          ].join('-');
        } else {
          return unrelated;
        }
      });

      // for grouping, we are only iterested in collection
      // related ops with group size > 1
      let groupsToOmit = _.filter(_.keys(groups), (k) => {
        return groups[k].length === 1;
      });
      groupsToOmit.push(unrelated);
      groups = _.omit(groups, groupsToOmit);

      _.each(_.values(groups), (g) => {
        // merge traces together
        // jsonString is a serialized list of all items
        // _timestamp should be set to that of the latest entry in the group
        let mergedTrace = _.reduce(g, (memo, item) => {
          let currentMessage = memo.message;
          currentMessage.push(item.message);
          return _.extend(memo, { message : currentMessage });
        }, {
          isOutbound : _.first(g).isOutbound,
          _timestamp : _.first(_.sortBy(g, (t) => -t._timestamp))._timestamp,
          message : []
        });

        // remove group members from the original traces 
        // and add the resulting merged trace to the original traces
        const ids = _.pluck(g,'_id') 

        traces = _.filter(traces, (t) => {
          return !_.contains(ids,t._id);
        });
        traces.push(mergedTrace);
      });

      return traces;
    },

    // Label messages
    (traces) => {
      return _.map(traces, (t) => {
        let label = t.message.msg;
        let operation = label;

        if(_.isArray(t.message)){
          // dealing with a grouped message
          const count = t.message.length;
          const collection = _.first(t.message).collection;
          operation = _.first(t.message).msg;
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
          label : label,
          operation : operation
        });
      });
    }
  ]
};
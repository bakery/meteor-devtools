import _ from 'underscore';

export default {
  filterTraces(traces, filters) {
    
    let disabledFilters = _.reduce(_.keys(filters), (memo, filterName) => { 
      let filter = filters[filterName];
      return filter.enabled ? 
        memo :  
        [...memo, ...filter.operations];
    }, []); 

    return _.filter(traces, function(trace){
        return !_.contains(disabledFilters, trace.operation);
    });
  }
};
import React, { PropTypes } from 'react';
import TraceItem from './trace-item';

export default React.createClass({
  propTypes : {
    traces : PropTypes.array.isRequired
  },

  render () {
    const noData = this.props.traces.length === 0 ?
      <li className="no-trace">No traces yet...</li> : null; 
    const items = this.props.traces.map(function(item){
      return <TraceItem data={item} key={item._id}/>;
    });

    return (
      <ul className="network-traces">
        {items}
        {noData}
      </ul>
    )
  }
});
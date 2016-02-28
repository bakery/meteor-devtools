import React, { PropTypes } from 'react';
export default React.createClass({
  propTypes : {
    stats: React.PropTypes.shape({
      inboundMessages: React.PropTypes.number.isRequired,
      outboundMessages: React.PropTypes.number.isRequired,
      messageTypes: React.PropTypes.object.isRequired
    }).isRequired
  },
  render (){
    return (
      <div>
        <i className="fa fa-arrow-down"></i>&nbsp;
        <strong>{this.props.stats.inboundMessages}</strong>&nbsp;
        <i className="fa fa-arrow-up"></i>&nbsp;
        <strong>{this.props.stats.outboundMessages}</strong>&nbsp;|&nbsp;
        <strong>collection ops: {this.props.stats.messageTypes.collections}</strong>&nbsp;
        <strong>method calls: {this.props.stats.messageTypes.methodCalls}</strong>&nbsp;
        <strong>subs: {this.props.stats.messageTypes.subscriptions}</strong>
      </div>
    )
  }
});
import React, { PropTypes } from 'react';
import prettyBytes from 'pretty-bytes';

export default React.createClass({
  propTypes : {
    stats: React.PropTypes.shape({
      inboundMessages: React.PropTypes.number.isRequired,
      outboundMessages: React.PropTypes.number.isRequired,
      inboundMessagesSize: React.PropTypes.number.isRequired,
      outboundMessagesSize: React.PropTypes.number.isRequired,
      messageTypes: React.PropTypes.object.isRequired
    }).isRequired
  },
  render (){
    const inboundMessagesSize = prettyBytes(this.props.stats.inboundMessagesSize);
    const outboundMessagesSize = prettyBytes(this.props.stats.outboundMessagesSize);
    return (
      <div>
        <span title="inbound messages">
          <i className="fa fa-arrow-down"></i>&nbsp;
          <span>{inboundMessagesSize}</span>&nbsp;
        </span>&nbsp;
        <span title="outbound messages">
          <i className="fa fa-arrow-up"></i>&nbsp;
          <span>{outboundMessagesSize}</span>
        </span>&ensp;|&ensp;
        <span title="collection operations">collection ops: {this.props.stats.messageTypes.collections}</span>&ensp;|&ensp;
        <span title="method calls">method calls: {this.props.stats.messageTypes.methodCalls}</span>&ensp;|&ensp;
        <span title="subscriptions">subs: {this.props.stats.messageTypes.subscriptions}</span>
      </div>
    )
  }
});
import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes : {
    stats: React.PropTypes.shape({
      inboundMessages: React.PropTypes.number.isRequired,
      outboundMessages: React.PropTypes.number.isRequired,
      messageTypes: React.PropTypes.object.isRequired
    }).isRequired
  },
  // onClick (event){
  //   this.props.onToggle(this.props.name);
  // },
  render (){
    // let filterClass = classNames('filter', (this.props.name).toLowerCase());
    // let filterId = 'hide-'+(this.props.name).toLowerCase();

    return (
      <div>
        <strong>in: {this.props.stats.inboundMessages}</strong>&nbsp;
        <strong>out: {this.props.stats.outboundMessages}</strong>&nbsp;
        <strong>collections: {this.props.stats.messageTypes.Collections}</strong>&nbsp;
        <strong>methods: {this.props.stats.messageTypes.Methods}</strong>&nbsp;
        <strong>subscriptions: {this.props.stats.messageTypes.Subscriptions}</strong>
      </div>
    )
  }
});
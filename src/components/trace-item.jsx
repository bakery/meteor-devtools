import React from 'react';
import classNames from 'classnames';
import Helpers from '../helpers';
import TraceItemTabs from './trace-item-tabs';
import ItemPropTypes from './trace-item-prop-types';

export default React.createClass({

  propTypes: ItemPropTypes,

  getInitialState () {
    return { isExpanded : false };
  },

  onExpandToggle () {
    this.setState({isExpanded : !this.state.isExpanded});
  },

  render () {
    let itemClass = classNames({
      outbound : this.props.data.isOutbound,
      inbound : !this.props.data.isOutbound
    });
    let directionIconClass = classNames('fa', {
      'fa-arrow-circle-o-up' : this.props.data.isOutbound, 
      'fa-arrow-circle-o-down' : !this.props.data.isOutbound
    });
    let toggleIconClass = classNames('fa', {
      'fa-minus-square-o' : this.state.isExpanded,
      'fa-plus-square-o' : !this.state.isExpanded
    });  
    let tooltip = this.props.data.isOutbound ? 'Client says' : 'Server says';
    let compactJSONString = Helpers.unescapeBackSlashes(
        Helpers.compactJSONString(JSON.stringify(this.props.data.message), 50));
    let iconClass = classNames({
      'client' : this.props.data.isOutbound, 
      'server' : !this.props.data.isOutbound
    }, this.props.data.operation);
    let tabs = this.state.isExpanded
      ? <TraceItemTabs data={this.props.data} /> 
      : null;

    return (
      <li className={itemClass}>
        <span className={iconClass} title={tooltip}></span>
        <strong>{this.props.data.label}</strong>&nbsp;
        <span className="op-label" onClick={this.onExpandToggle}>{compactJSONString}
          &nbsp;<i className={toggleIconClass}></i>
        </span>
        {tabs}
      </li>
    )
  }
});
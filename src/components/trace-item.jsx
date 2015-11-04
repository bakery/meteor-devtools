import React from 'react';
import Actions from '../actions';
import JSONTree from 'react-json-tree';
import classNames from 'classnames';
import Helpers from '../helpers';

export default React.createClass({

  propTypes: {
    data: React.PropTypes.shape({
      isOutbound : React.PropTypes.bool.isRequired,
      message : React.PropTypes.object.isRequired,
      label : React.PropTypes.string,
      operation : React.PropTypes.string
    }).isRequired
  },

  getInitialState () {
    return { isExpanded : false };
  },

  onExpandToggle () {
    this.setState({isExpanded : !this.state.isExpanded});
  },

  render () {
    
    const getStyle = (type, expanded) => ({ marginTop: 4 })

    const itemClass = classNames({
      outbound : this.props.data.isOutbound,
      inbound : !this.props.data.isOutbound
    });
    const directionIconClass = classNames('fa', {
      'fa-arrow-circle-o-up' : this.props.data.isOutbound, 
      'fa-arrow-circle-o-down' : !this.props.data.isOutbound
    });
    const toggleIconClass = classNames('fa', {
      'fa-minus-square-o' : this.state.isExpanded,
      'fa-plus-square-o' : !this.state.isExpanded
    });  
    const tooltip = this.props.data.isOutbound ? 'Client says: ' : 'Server says: ';
    const compactJSONString = Helpers.unescapeBackSlashes(
        Helpers.compactJSONString(JSON.stringify(this.props.data.message), 50))
    const jsonTree = this.state.isExpanded ? 
      <JSONTree data={ this.props.data.message } getArrowStyle={getStyle} /> : null;
    const iconClass = classNames({
      'client' : this.props.data.isOutbound, 
      'server' : !this.props.data.isOutbound
    }, this.props.data.operation);

    return (
      <li className={itemClass}>
        <span className={iconClass} title="${tooltip}"></span> {tooltip} 
        <strong>{this.props.data.label}</strong>&nbsp;
        <span className="op-label" onClick={this.onExpandToggle}>{compactJSONString}
          <i className={toggleIconClass}></i>
        </span>
        {jsonTree}
      </li>
    )
  }
});
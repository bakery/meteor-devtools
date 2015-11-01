import React from 'react';
import Actions from '../actions';
import JSONTree from 'react-json-tree';
import classNames from 'classnames';
import Helpers from '../helpers';

export default React.createClass({

  propTypes: {
    data: React.PropTypes.shape({
      isOutbound : React.PropTypes.bool.isRequired,
      jsonString : React.PropTypes.string.isRequired
    }).isRequired,
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
    const tooltip = this.props.data.isOutbound ?
      'Client says:' : 'Server says:';

    const compactJSONString = Helpers.unescapeBackSlashes(
        Helpers.compactJSONString(this.props.data.jsonString, 50))

    const jsonTree = this.state.isExpanded ? 
      <JSONTree data={ JSON.parse(this.props.data.jsonString) } getArrowStyle={getStyle} /> : null;

    return (
      <li className={itemClass}>
        <i className={directionIconClass} tooltip="${tooltip}"></i> {tooltip} 
        <span className="op-label" onClick={this.onExpandToggle}>{compactJSONString}
          <i className={toggleIconClass}></i>
        </span>
        {jsonTree}
      </li>
    )
  }
});
const React = require('react'),
      Actions = require('../actions'),
      JSONTree = require('react-json-tree');

module.exports = React.createClass({
  onExpandToggle : function(){
    Actions.toggleTraceExtension(this.props.data._id); 
  },

  render : function(){
    var messageDirectionIcon = this.props.data.isOutbound ?
      <i tooltip="client says" className="fa fa-arrow-circle-o-up"></i> :
      <i tooltip="server says" className="fa fa-arrow-circle-o-down"></i>;
    var messageDirectionLabel = this.props.data.isOutbound ? 'Client says:' :
      'Server says:';
    var itemClassName = this.props.data.isOutbound ? 'outbound' : 'inbound';
    var expandClass = this.props.data.expanded ? 'expand' : null;
    var jsonTree = this.props.data.expanded ? 
      <JSONTree data={ JSON.parse(this.props.data.jsonString) } /> : null;

    return (
      <li className="{itemClassName}">
        {messageDirectionIcon} {messageDirectionLabel} 
        <span className="op-label">{this.props.data.compactJSONString}
          <i className="fa fa-plus-square-o" onClick={this.onExpandToggle}></i>
        </span>
        <pre className={expandClass}>
          {jsonTree}
        </pre>
      </li>
    )
  }
});
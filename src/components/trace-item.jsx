const React = require('react'),
      Actions = require('../actions'),
      JSONTree = require('react-json-tree');

module.exports = React.createClass({

  propTypes: {
    data: React.PropTypes.shape({
      _id: React.PropTypes.string.isRequired,
      isOutbound : React.PropTypes.bool.isRequired,
      jsonString : React.PropTypes.string.isRequired,
      compactJSONString : React.PropTypes.string.isRequired
    }).isRequired,
  },

  getInitialState: function() {
    return { isExpanded : false };
  },

  onExpandToggle : function(){
    this.setState({isExpanded : !this.state.isExpanded});
  },

  render : function(){
    const getStyle = (type, expanded) => ({ marginTop: 4 })

    var messageDirectionIcon = this.props.data.isOutbound ?
      <i className="fa fa-arrow-circle-o-up" tooltip="client says"></i> :
      <i className="fa fa-arrow-circle-o-down" tooltip="server says"></i>;
    var messageDirectionLabel = this.props.data.isOutbound ? 'Client says:' :
      'Server says:';
    var itemClassName = this.props.data.isOutbound ? 'outbound' : 'inbound';
    var jsonTree = this.state.isExpanded ? 
      <JSONTree data={ JSON.parse(this.props.data.jsonString) } getArrowStyle={getStyle} /> : null;
    var expandToggleClassName = this.state.isExpanded ?
      'fa fa-minus-square-o' : 'fa fa-plus-square-o';

    return (
      <li className="{itemClassName}" key={this.props.data._id}>
        {messageDirectionIcon} {messageDirectionLabel} 
        <span className="op-label" onClick={this.onExpandToggle}>{this.props.data.compactJSONString}
          <i className={expandToggleClassName}></i>
        </span>
        {jsonTree}
      </li>
    )
  }
});
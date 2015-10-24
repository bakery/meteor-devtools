const React = require('react'),
      Actions = require('../actions');

module.exports = React.createClass({
  onClick : function(){
    Actions.clearLogs();
  },
  render : function(){
    return (
      <button onClick={this.onClick}><i className="fa fa-trash"></i> Clear</button>
    )
  }
});
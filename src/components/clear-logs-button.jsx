const React = require('react'),
      Actions = require('../actions');

module.exports = React.createClass({
  onClick : function(){
    Actions.clearLogs(); 
  },
  render : function(){
    return (
      <button onClick={this.onClick}>Clear</button>
    )
  }
});
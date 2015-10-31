import React from 'react';
import Actions from '../actions';

export default React.createClass({
  onClick (){
    Actions.clearLogs();
  },
  render (){
    return (
      <button onClick={this.onClick}><i className="fa fa-trash"></i> Clear</button>
    )
  }
});
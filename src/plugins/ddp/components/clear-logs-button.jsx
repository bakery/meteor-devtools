import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes : {
    onClearClick : PropTypes.func.isRequired
  }, 
  onClick (){
    this.props.onClearClick();
  },
  render (){
    return (
      <button onClick={this.onClick}><i className="fa fa-trash"></i> Clear</button>
    )
  }
});
import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes : {
    onToggle : PropTypes.func.isRequired,
    enabled : PropTypes.bool.isRequired
  },
  onClick (event){
    this.props.onToggle('PingPong');
  },
  render (){
    return (
        <div className="ping-checkbox">
            <input checked={this.props.enabled} id="hide-ping" onClick={this.onClick} type="checkbox" />
            <label htmlFor="hide-ping">Show Ping/Pong</label>
        </div>
    )
  }
});
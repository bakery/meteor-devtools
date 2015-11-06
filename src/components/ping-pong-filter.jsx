import React from 'react';
import Actions from '../actions';

export default React.createClass({
  onClick (event){
    event.target.checked ? 
        Actions.addFilter(['ping','pong']) : Actions.removeFilter(['ping','pong']);
  },
  render (){
    return (
        <div className="ping-checkbox">
            <input id="hide-ping" onClick={this.onClick} type="checkbox" />
            <label htmlFor="hide-ping">Hide Ping/Pong</label>
        </div>
    )
  }
});
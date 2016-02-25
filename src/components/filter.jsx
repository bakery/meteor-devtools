import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default React.createClass({
  propTypes : {
    onToggle : PropTypes.func.isRequired,
    enabled : PropTypes.bool.isRequired,
    name : PropTypes.string
  },
  onClick (event){
    this.props.onToggle(this.props.name);
  },
  render (){
    let filterClass = classNames('filter', (this.props.name).toLowerCase());
    let filterId = 'hide-'+(this.props.name).toLowerCase();

    return (
        <div className={filterClass}>
            <input checked={this.props.enabled} id={filterId} onClick={this.onClick} type="checkbox" />
            <label htmlFor={filterId}>Show {this.props.name}</label>
        </div>
    )
  }
});
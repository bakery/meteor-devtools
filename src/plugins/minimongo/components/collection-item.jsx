import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes : {
    name : PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired
  },

  changeSelection () {
    this.props.changeCollectionSelection(this.props.name);
  },

  render () {
    return (
      <li className={(this.props.isSelected ? 'selected' : '')}
      onClick={this.changeSelection}>
        {this.props.name} ({this.props.length})
      </li>
    )
  }
});
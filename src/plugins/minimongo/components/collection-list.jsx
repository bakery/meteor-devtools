import React, { PropTypes } from 'react';
import CollectionItem from './collection-item';

export default React.createClass({
  propTypes : {
    collections : PropTypes.array.isRequired
  },

  isSelected (itemName) {
    return this.props.currentSelection === itemName;
  },

  render () {
    const noData = this.props.collections.length === 0 ?
      <li className="no-collections">No collections yet...</li> : null;
    const items = this.props.collections.map((item) => {
      return <CollectionItem name={item.name} length={item.length}
      changeCollectionSelection={this.props.changeCollectionSelection} 
      isSelected={this.isSelected(item.name)}/>
    });

    return (
      <ul className="minimongo-collections">
        {items}
      </ul>
    )
  }
});
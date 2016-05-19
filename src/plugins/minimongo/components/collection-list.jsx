import React, { PropTypes } from 'react';
import CollectionItem from './collection-item';

export default React.createClass({
  propTypes : {
    collections : PropTypes.object.isRequired,
    changeCollectionSelection: PropTypes.func.isRequired,
    currentSelection: PropTypes.string
  },

  isSelected (itemName) {
    return this.props.currentSelection === itemName;
  },

  render () {
    const noData = this.props.collections.count() === 0 ?
      <li className="no-collections">No collections yet...</li> : null;
    const items = this.props.collections.valueSeq().map((item) => {
      return (
        <CollectionItem 
          changeCollectionSelection={this.props.changeCollectionSelection}
          isSelected={this.isSelected(item.name)}
          key={item.name} name={item.name} size={item.size} 
        />
      )
    });

    return (
      <ul className="minimongo-collections">
        {noData}
        {items}
      </ul>
    )
  }
});
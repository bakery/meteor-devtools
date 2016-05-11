import React, { PropTypes } from 'react';
import JSONTree from 'react-json-tree';

export default React.createClass({
  propTypes : {
    data : PropTypes.array
  },

  render () {
    if(typeof(this.props.data) !== 'object'){
      return;
    }

    const theme = {
      tree: {
        backgroundColor: 'transparent'
      },
      arrow: ({ style }, type, expanded) => ({
        style: Object.assign(style, {
            marginTop: 2,
        })
      }),
    };
    
    let getItemString = (type, data, itemType, itemString) => {
      return (<span> {data._id} {itemType} {itemString} </span>);
    };
    
    if(Object.keys(this.props.data).length === 0){
      return <div className="no-minimongo">No items in this collection.</div>
    } else {
      return (
        <JSONTree 
        data={this.props.data} 
        getItemString={getItemString} 
        hideRoot
        theme={theme} 
      />);
    }
  }
});
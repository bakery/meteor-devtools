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
        backgroundColor: 'transparent',
        fontSize: '1em'
      },
      arrow: ({ style }, type, expanded) => ({
        style: Object.assign(style, {
            marginTop: 2
        })
      }),
    };
    
    let getItemString = (type, data, itemType, itemString) => {
      let id = (typeof data._id) === 'string' ? data._id : 
        data._id && data._id._str;
      return (<span> {id} {itemType} {itemString} </span>);
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
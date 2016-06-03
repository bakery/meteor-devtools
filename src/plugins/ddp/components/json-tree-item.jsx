import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCollectionSelection, setCollectionAndQuery } from '../../minimongo/actions';
import { setTabIndex } from '../../../common/actions';
import { MINIMONGO_TAB_INDEX } from '../../../common/constants';

class JSONTreeItem extends Component {
  
  _printValue () {
    // if data is an array, 
    // check the first item to get collection name
    let data = this.props.data;
    if(Array.isArray(this.props.data) && this.props.data.length){
      data = this.props.data[0];
    } 
    if((data.msg === 'added' || data.msg === 'changed') &&
      (this.props.label === 'id' || this.props.label === 'collection')) {
      return (
        <span onClick={this.props.setMinimongoState}>
          "<span className="collection-link">{this.props.raw}</span>"
        </span>);
    } else {
      return (<span>{this.props.value}</span>);
    }
  }

  render () {
    return (<span>{this._printValue()}</span>);
  }
};

JSONTreeItem.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  data: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.array
        ]).isRequired,
  raw: PropTypes.string.isRequired,
  setMinimongoState: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const query = `{ query : {"_id":"${ownProps.raw}"}, fields: {}, sort: {} }`;
  return {
    setMinimongoState: () => {
      // if data is an array, 
      // check the first item to get collection name
      let data = ownProps.data;
      if(Array.isArray(ownProps.data) && ownProps.data.length){
        data = ownProps.data[0];
      } 
      if(ownProps.label === 'id'){
        dispatch(setCollectionAndQuery(data.collection, query));
      }
      if(ownProps.label === 'collection'){
        dispatch(setCollectionSelection(data.collection));
      }
    }
  };
};

export default connect(null, mapDispatchToProps)(JSONTreeItem);

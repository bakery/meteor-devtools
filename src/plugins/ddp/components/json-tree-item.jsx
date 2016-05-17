import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { 
  setCollectionSelection,
  setCollectionAndQuery
} from '../../minimongo/actions';

class JSONTreeItem extends Component {
  
  _printValue () {
    if((this.props.data.msg === 'added' || this.props.data.msg === 'changed' || 'removed') &&
      (this.props.label === 'id' || this.props.label === 'collection')) {
      return (
        <span className="collection-link" onClick={this.props.setMinimongoState}>
          {this.props.value}
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
  data: PropTypes.object.isRequired,
  raw: PropTypes.string.isRequired,
  setMinimongoState: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const query = ['{ query : {',
    '"_id":"', ownProps.raw,
    '"}, fields: {}, sort: {} }'
  ].join('');
  return {
    setMinimongoState: () => {
      if(ownProps.label === 'id'){
        dispatch(setCollectionAndQuery(ownProps.data.collection, query));
      }
      if(ownProps.label === 'collection'){
        dispatch(setCollectionSelection(ownProps.data.collection)) 
      }
    }
  };
};

export default connect(null, mapDispatchToProps)(JSONTreeItem);

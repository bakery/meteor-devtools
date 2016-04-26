import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Bridge from '../../common/bridge';
import JSONTree from 'react-json-tree';
import {
  setMinimongoCollections, 
  changeCollectionSelection 
} from './actions';
import Immutable from 'immutable';
import Analytics from '../../common/analytics';
import CollectionList from './components/collection-list';
import './minimongo.css';

let dispatch = null;

const onNewMessage = (error, message) => {
  if(message && message.eventType === 'minimongo-explorer') {
    dispatch(setMinimongoCollections(message.data));
  }
};

class App extends Component {

  componentDidMount() {
    dispatch = this.props.dispatch;

    if(chrome && chrome.devtools) {
      Bridge.registerMessageCallback(onNewMessage);
      Bridge.sendMessageToThePage({
        source: 'minimongo-explorer',
        event: 'get-minimongo-collections'
      });
    } else {
      var fakeCollections = require('./fake');
      onNewMessage.call(this, null, {
        eventType: 'minimongo-explorer',
        data: fakeCollections
      });
    }

    Analytics.trackPageView('minimongo explorer');
  }

  componentWillUnmount() {
    Bridge.removeMessageCallback(onNewMessage);
  }

  _renderData (data) {
    if(typeof(data) !== 'object'){
      return;
    }
    let getStyle = (type, expanded) => ({ marginTop: 4 });
    let getItemString = (type, data, itemType, itemString) => {
      return (<span> {data._id} {itemType} {itemString} </span>);
    };
    if(Object.keys(data).length === 0){
      return <div className="no-minimongo">No items in this collection.</div>
    } else {
      return (
        <JSONTree 
        data={data} 
        getArrowStyle={getStyle} 
        getItemString={getItemString} 
        hideRoot={true}
        />);
    }
  }

  _sectionHeader (currentSelection) {
    if(currentSelection){
      console.log(currentSelection);
      return <div className="minimongo-content-header">{currentSelection}</div>
    } else {
      return <div className="no-minimongo">No collections yet...</div>
    }
  }

  render() {
    const data = this.props.minimongoCollections;
    const collectionItems = this.props.getItemsForCollection(this.props.minimongoCurrentSelection);
    const noData = Immutable.is(data, Immutable.fromJS({}));
    const changeSelection = (collectionName) => {
      dispatch(changeCollectionSelection(collectionName));
    }

    return (
      <div className="minimongo">
        <aside>
          <CollectionList 
          changeCollectionSelection={changeSelection} 
          collections={this.props.getCollections()}
          currentSelection={this.props.minimongoCurrentSelection}
          />
        </aside>
        <section>
          { this._sectionHeader(this.props.minimongoCurrentSelection) }
          { this._renderData(collectionItems) } 
        </section> 
      </div>
    )
  }
}

export default connect((state) => {
  return {
    minimongoCollections: state.minimongoCollections,
    minimongoCurrentSelection: state.minimongoCurrentSelection,
    getCollections: () => {
      const data = state.minimongoCollections.toJS();
      const keys = Object.keys(data);
      return keys.map((value) => {
        return {
          'name': value,
          'length': data[value].length
        }
      });
    },
    getItemsForCollection: (collection) => {
      const data = state.minimongoCollections.toJS();
      return data[collection];
    }
  };
})(App)
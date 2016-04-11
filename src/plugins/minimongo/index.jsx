import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Bridge from '../../common/bridge';
import JSONTree from 'react-json-tree';
import {
  setMinimongoCollections 
} from './actions';
import Immutable from 'immutable';
import Analytics from '../../common/analytics';
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
    let getStyle = (type, expanded) => ({ marginTop: 4 });
    let getItemString = (type, data, itemType, itemString) => {
      return (<span> {data._id} {itemType} {itemString} </span>);
    };
    return <JSONTree data={data} getArrowStyle={getStyle} hideRoot={true} getItemString={getItemString} />;
  }

  render() {
    const data = this.props.minimongoCollections;
    const noData = Immutable.is(data, Immutable.fromJS({}));
    return (
      <div className="minimongo-explorer">
      { noData ? <div className="no-minimongo">No MiniMongo collections...</div>
      : this._renderData(data.toJS()) }
      </div>
    )
  }
}

export default connect((state) => {
  return {
    minimongoCollections: state.minimongoCollections,
  };
})(App)
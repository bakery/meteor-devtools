import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Bridge from '../../common/bridge';
import JSONTree from 'react-json-tree';
import {
  setMinimongoCollections 
} from './actions';

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
      // Bridge.registerPageReloadCallback(onPageReload);
    } else {
      var fakeCollections = require('./fake');
      onNewMessage.call(this, null, {
        eventType: 'minimongo-explorer',
        data: fakeCollections
      });
    }
  }

  componentWillUnmount() {
  }

  _renderData (data) {
    let getStyle = (type, expanded) => ({ marginTop: 4 });
    let getItemString = (type, data, itemType, itemString) => {
      return (<span> {data._id} {itemType} {itemString} </span>);
    };
    return <JSONTree data={data} getArrowStyle={getStyle} hideRoot={true} getItemString={getItemString} />;
  }

  render() {
    return (
      <div className="minimongo-explorer">
          {this._renderData(this.props.minimongoCollections.toJS())}
      </div>
    )
  }
}

export default connect((state) => {
  return {
    minimongoCollections: state.minimongoCollections,
  };
})(App)
import React from 'react';
import JSONTree from 'react-json-tree';
import ItemPropTypes from './trace-item-prop-types';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

export default React.createClass({
  propTypes: ItemPropTypes,

  _getRequestTabLabel () {
    const mappings = {
      ready : 'Subscription',
      result : 'Method'
    };
    let label = mappings[this.props.data.operation];
    return label ? label : 'Request'
  },

  _renderMessage (data) {
    let getStyle = (type, expanded) => ({ marginTop: 4 });
    return <JSONTree data={data} getArrowStyle={getStyle} />;
  },

  _renderTablist () {
    let l = [
      <Tab>Message</Tab>, 
    ];

    if(this.props.data.request){
      l.push(<Tab>{this._getRequestTabLabel()}</Tab>);
    }

    return l;
  },

  _renderTabPanels () {
    let tb = [
      <TabPanel>
        {this._renderMessage(this.props.data.message)}
      </TabPanel>
    ];

    if(this.props.data.request){
      tb.push(<TabPanel>
        {this._renderMessage(this.props.data.request.message)}
      </TabPanel>);
    }

    return tb;
  },

  render () {
    return (
      <Tabs>
        <TabList>
          {this._renderTablist()}
        </TabList>
        {this._renderTabPanels()}
      </Tabs>
    );
  }
});
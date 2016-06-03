import React from 'react'
import JSONTree from 'react-json-tree'
import ItemPropTypes from './trace-item-prop-types'
import JSONTreeItem from './json-tree-item'
import {Tab, Tabs, TabList, TabPanel} from '../../../patch/react-tabs'
import Bridge from '../../../common/bridge'
import Warnings from './warnings'

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
    const theme = {
      tree: {
        backgroundColor: 'transparent',
        fontSize: '1em'
      },
      arrow: ({ style }, type, expanded) => ({
        style: Object.assign(style, {
            marginTop: 2,
        })
      }),
    };

    let valueRenderer = (value, raw, key) => {
      return (<JSONTreeItem 
        data={this.props.data.message} 
        label={key} 
        raw={raw}
        value={value} 
      />);
    };

    return (<JSONTree
      data={data}
      theme={theme} 
      valueRenderer={valueRenderer}
    />);
  },

  _renderTablist () {
    let l = [
      <Tab key={0}>Message</Tab>, 
    ];

    if(this.props.data.request){
      l.push(<Tab key={1}>{this._getRequestTabLabel()}</Tab>);
    }

    if(this.props.data.stackTrace){
      l.push(<Tab key={2}>Stack Trace</Tab>); 
    }

    if(this.props.data.warnings){
      l.push(<Tab key={3}>⚠️ Warnings</Tab>);
    }

    return l;
  },

  _renderTabPanels () {
    let tb = [
      <TabPanel key={0}>
        {this._renderMessage(this.props.data.message)}
      </TabPanel>
    ];

    if(this.props.data.request){
      tb.push(<TabPanel key={1}>
        {this._renderMessage(this.props.data.request.message)}
      </TabPanel>);
    }

    if(this.props.data.stackTrace){
      const stackTrace = this.props.data.stackTrace.map(function(st, i){

        let shortUrl = st.fileName || '<anonymous>';
        let functionName = st.functionName ?
          st.functionName :
          '(anonymous function)';

        if(shortUrl !== '<anonymous>'){
          let matches = shortUrl.match(/\/([^?\/]*)\?/) ||
            shortUrl.match(/\/([^\/]*)$/);

          shortUrl = matches && matches.length === 2 ? 
            matches[1] :
            shortUrl; 
        }

        shortUrl = st.lineNumber ? `${shortUrl}:${st.lineNumber}` : shortUrl;

        return (
          <tr key={i}>
            <td>{functionName}</td>
            <td>
              @ <a href="#"
                  onClick={ (e) => {
                    e.preventDefault(); 
                    Bridge.openResource(st.fileName, st.lineNumber);
                  } }>
                  {shortUrl}
                </a>
            </td>
          </tr>
        ); 
      });

      tb.push(
        <TabPanel key={2}>
          <table className="stack-trace">
            <tbody>
            {stackTrace}
            </tbody>
          </table>
        </TabPanel>
      );
    }

    if(this.props.data.warnings){
      tb.push(
        <TabPanel key={3}>
          <Warnings warnings={this.props.data.warnings} />
        </TabPanel>
      ); 
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
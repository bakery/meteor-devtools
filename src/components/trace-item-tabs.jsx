import React from 'react'
import JSONTree from 'react-json-tree'
import ItemPropTypes from './trace-item-prop-types'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import Bridge from '../bridge'

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

    if(this.props.data.stackTrace){
      l.push(<Tab>Stack Trace</Tab>); 
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

    if(this.props.data.stackTrace){
      const stackTrace = this.props.data.stackTrace.map(function(st){

        let shortUrl = st.fileName;
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
          <tr>
            <td>{functionName}</td>
            <td>
              @ <a className="webkit-html-resource-link" href="#"
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
        <TabPanel>
          <table className="stack-trace">
            {stackTrace}
          </table>
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
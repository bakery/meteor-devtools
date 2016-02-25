import React, { PropTypes } from 'react';
// import Store from '../trace-store';
import TraceItem from './trace-item';

export default React.createClass({

  propTypes : {
    traces : PropTypes.array.isRequired
  },

  // componentDidMount () {
  //   Store.on('change', this.onChange);
  // },

  componentDidUpdate () {
    var body = document.body, html = document.documentElement;
    var height = Math.max(body.scrollHeight, body.offsetHeight, 
      html.clientHeight, html.scrollHeight, html.offsetHeight);
    var ratio = (window.scrollY + window.innerHeight)/height;

    if(ratio > 0.8) {
      window.scrollTo(0,document.body.scrollHeight);
    }
  },

  // getInitialState () {
  //   return {
  //     items : []
  //   };
  // },

  // onChange () {
  //   this.setState({
  //     items : Store.getState()
  //   });
  // },

  render () {
    const noData = this.props.traces.length === 0 ?
      <li className="no-trace">No traces yet...</li> : null; 
    const items = this.props.traces.map(function(item){
      return <TraceItem data={item}/>;
    });
    
    return (
      <ul className="network-traces">
        {items}
        {noData}
      </ul>
    )
  }
});
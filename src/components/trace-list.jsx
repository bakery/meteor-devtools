import React from 'react';
import Store from '../store';
import TraceItem from './trace-item';

export default React.createClass({
  componentDidMount () {
    Store.on('change', this.onChange);
  },

  componentDidUpdate () {
    var body = document.body, html = document.documentElement;
    var height = Math.max(body.scrollHeight, body.offsetHeight, 
      html.clientHeight, html.scrollHeight, html.offsetHeight);
    var ratio = (window.scrollY + window.innerHeight)/height;

    if(ratio > 0.8) {
      window.scrollTo(0,document.body.scrollHeight);
    }
  },

  getInitialState () {
    return {
      items : []
    };
  },

  onChange () {
    this.setState({
      items : Store.getState()
    });
  },

  render () {
    const noData = this.state.items.length === 0 ?
      <div>No traces yet...</div> : null; 
    const items = this.state.items.map(function(item){
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
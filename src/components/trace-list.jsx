import React, { PropTypes } from 'react';
import TraceItem from './trace-item';

let autoscrollToTheBottom = true;
const body = document.body; 
const html = document.documentElement;

export default React.createClass({

  propTypes : {
    traces : PropTypes.array.isRequired
  },

  componentDidMount () {
    // XX: decide if we want to autoscoll to the bottom of the window
    // when new data arrives - only do it if the person has explicitly 
    // scrolled to the bottom of the window already
    window.addEventListener('scroll', (e) => {
      const height = Math.max(body.scrollHeight, body.offsetHeight, 
        html.clientHeight, html.scrollHeight, html.offsetHeight);
      
      autoscrollToTheBottom = (window.scrollY + window.innerHeight) === height;
    });
  },

  componentDidUpdate () {
    if (autoscrollToTheBottom) {
      window.scrollTo(0,document.body.scrollHeight);
    }
  },

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
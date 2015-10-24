const React = require('react'),
      Store = require('../store'),
      TraceItem = require('./trace-item');

module.exports = React.createClass({
  componentDidMount: function () {
    Store.on('change', this.onChange);
  },

  componentDidUpdate: function(){
    var body = document.body, html = document.documentElement;
    var height = Math.max(body.scrollHeight, body.offsetHeight, 
      html.clientHeight, html.scrollHeight, html.offsetHeight);
    var ratio = (window.scrollY + window.innerHeight)/height;

    if(ratio > 0.8) {
      window.scrollTo(0,document.body.scrollHeight);
    }
  },

  getInitialState: function(){
    return {
      items : []
    };
  },

  onChange: function () {
    this.setState({
      items : Store.getState()
    });
  },

  render : function(){
    var noData = this.state.items.length === 0 ?
      <div>No traces yet...</div> : null; 
    var items = this.state.items.map(function(item){
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
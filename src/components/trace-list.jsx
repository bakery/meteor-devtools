const React = require('react'),
      Store = require('../store'),
      TraceItem = require('./trace-item');

module.exports = React.createClass({
  componentDidMount: function () {
    Store.on('change', this.onChange);
  },

  getInitialState: function(){
    return {
      items : []
    };
  },

  onChange: function () {
    console.error('store store state', Store.getState());
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

    console.error('props are', this.state);

    return (
      <ul className="network-traces">
        {items}
        {noData}
      </ul>
    )
  }
});
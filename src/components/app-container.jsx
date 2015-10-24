const React = require('react'),
      Store = require('../store'),
      Actions = require('../actions'),
      TraceList = require('./trace-list'),
      ClearLogsButton = require('./clear-logs-button');

module.exports = React.createClass({
  render : function(){
    return (
      <div>
        <header>
          <a href="https://github.com/thebakeryio/meteor-ddp-monitor" target="_blank">
            <i className="fa fa-bug"></i> Bugs, Features, PRs</a>
          <ClearLogsButton />
        </header>
        <TraceList />
      </div>
    )
  }
});
const React = require('react'),
      NotificationSystem = require('react-notification-system'),
      Store = require('../store'),
      Actions = require('../actions'),
      TraceList = require('./trace-list'),
      ClearLogsButton = require('./clear-logs-button');

module.exports = React.createClass({

  _notificationSystem: null,

  componentDidMount: function() {
    this._notificationSystem = this.refs.notificationSystem;
  },

  showErrorMessage : function(message){
    this._notificationSystem.addNotification({
      message: message,
      level: 'error'
    });
  },

  render : function(){
    return (
      <div>
        <header>
          <a href="https://github.com/thebakeryio/meteor-ddp-monitor" target="_blank">Bugs, Features, PRs</a>
          <ClearLogsButton />
        </header>
        <TraceList />
        <NotificationSystem ref="notificationSystem" />
      </div>
    )
  }
});
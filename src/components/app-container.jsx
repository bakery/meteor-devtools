import React from 'react';
import Store from '../trace-store';
import Actions from '../actions';
import TraceList from './trace-list';
import ClearLogsButton from './clear-logs-button';
import PingPongFilter from './ping-pong-filter';
import NotificationSystem from 'react-notification-system';

export default React.createClass({

  showGlobalError: function(msg) {
    this._notificationSystem.addNotification({
      message: msg,
      level: 'error',
      position: 'br'
    });
  },

  componentDidMount: function() {
    this._notificationSystem = this.refs.notificationSystem;
  },

  render(){
    return (
      <div>
        <header>
          <a href="https://github.com/thebakeryio/meteor-ddp-monitor" target="_blank">
            <i className="fa fa-bug"></i> Bugs, Features, PRs</a>
          <ClearLogsButton />
          <PingPongFilter />
        </header>
        <TraceList />
        <NotificationSystem ref="notificationSystem" />
      </div>
    )
  }
});
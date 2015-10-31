import React from 'react';
import Store from '../store';
import Actions from '../actions';
import TraceList from './trace-list';
import ClearLogsButton from './clear-logs-button';

export default React.createClass({
  render(){
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
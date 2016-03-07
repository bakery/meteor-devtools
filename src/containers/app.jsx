import React, { Component, PropTypes } from 'react';
import TraceList from '../components/trace-list'
import NotificationSystem from 'react-notification-system'
import { connect } from 'react-redux'
import ClearLogsButton from '../components/clear-logs-button'
import Filter from '../components/filter' 
import {clearLogs} from '../actions/traces'
import {toggleFilter} from '../actions/filters'
import TraceFilter from '../lib/trace-filter'
import TraceProcessor from '../lib/trace-processor'
import Warnings from '../lib/warnings'
import {computeStats} from '../lib/stats'
import Stats from '../components/stats'

class App extends Component {
  showGlobalError(msg) {
    this._notificationSystem.addNotification({
      message: msg,
      level: 'error',
      position: 'br'
    });
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    window.onerror = (message) => {
      this.showGlobalError(message);
    };
  }

  render() {
    var notificaitonStyle = {
      NotificationItem: {
        DefaultStyle: {
          margin: '10px 5px 40px 1px'
        }
      }
    };

    const { dispatch, filters, traces, stats } = this.props
    return (
      <div>
        <header>
          <ClearLogsButton onClearClick={ () => dispatch(clearLogs())} />
          <Filter enabled={ filters.Subscriptions.enabled } name='Subscriptions' onToggle={ (filter) => dispatch(toggleFilter(filter)) } />
          <Filter enabled={ filters.Collections.enabled } name='Collections' onToggle={ (filter) => dispatch(toggleFilter(filter)) } />
          <Filter enabled={ filters.Methods.enabled } name='Methods' onToggle={ (filter) => dispatch(toggleFilter(filter)) } />
          <Filter enabled={ filters.Connect.enabled } name='Connect' onToggle={ (filter) => dispatch(toggleFilter(filter)) } />
          <Filter enabled={ filters.PingPong.enabled } name='PingPong' onToggle={ (filter) => dispatch(toggleFilter(filter)) } />
          <a href="https://github.com/thebakeryio/meteor-ddp-monitor" target="_blank">
            <i className="fa fa-bug"></i> Bugs, Features, PRs
          </a>          
        </header>
        <TraceList traces={traces} />
        <footer>
          <Stats stats={stats} />
        </footer>
        <NotificationSystem ref="notificationSystem" style={notificaitonStyle} />
      </div>
    )
  }
}

App.propTypes = {
  traces : PropTypes.array.isRequired
}

function mapStateToProps(state){
  const traces = TraceProcessor.processTraces(state.traces);
  const filteredTraces = TraceFilter.filterTraces(
    Warnings.checkForWarnings(traces),
    state.filters
  );
  return {
    traces : filteredTraces,
    filters : state.filters,
    stats: computeStats(traces)
  };
}

export default connect(
  mapStateToProps
)(App)
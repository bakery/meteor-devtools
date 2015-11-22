import React, { Component, PropTypes } from 'react';
import TraceList from '../components/trace-list'
import NotificationSystem from 'react-notification-system'
import { connect } from 'react-redux'
import ClearLogsButton from '../components/clear-logs-button'
import PingPongFilter from '../components/ping-pong-filter' 
import {clearLogs} from '../actions/traces'
import {toggleFilter} from '../actions/filters'
import TraceFilter from '../trace-filter'
import TraceProcessor from '../trace-processor'
import Warnings from '../warnings'

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
  }

  render() {
    const { dispatch, filters, traces } = this.props
    return (
      <div>
        <header>
          <ClearLogsButton onClearClick={ () => dispatch(clearLogs())} />
          <PingPongFilter enabled={ filters.PingPong.enabled } onToggle={ (filter) => dispatch(toggleFilter(filter)) }  />
          <a href="https://github.com/thebakeryio/meteor-ddp-monitor" target="_blank">
            <i className="fa fa-bug"></i> Bugs, Features, PRs
          </a>          
        </header>
        <TraceList traces={traces} />
        <NotificationSystem ref="notificationSystem" />
      </div>
    )
  }
}

App.propTypes = {
  traces : PropTypes.array.isRequired
}

function mapStateToProps(state){

  let filteredTraces = TraceFilter.filterTraces(
    Warnings.checkForWarnings(
      TraceProcessor.processTraces(state.traces)
    ),
    state.filters
  );

  return {
    traces : filteredTraces,
    filters : state.filters
  }
}

export default connect(
  mapStateToProps
)(App)
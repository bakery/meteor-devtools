import React, { PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'underscore';
import NodeType from './node-prop-type';
import Node from './node';

export default React.createClass({
  render (){
    if(this.props.rootNode) {
      return (
        <div>
          <Node key={this.props.rootNode.get('_id')} 
                onToggleCollapse={this.props.onToggleCollapse} 
                getChildNodes={this.props.getChildNodes}
                changeBlazeNodeSelection={this.props.changeBlazeNodeSelection}
                onHover={this.props.onHover}
                depth={0} node={this.props.rootNode}/>
        </div>
      );
    } else {
      return (
        <div>No nodes found</div>
      );
    }
  }
});

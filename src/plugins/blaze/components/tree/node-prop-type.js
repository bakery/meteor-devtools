import React from 'react';

const NodeType = React.PropTypes.shape({
  _id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  data: React.PropTypes.object,
  isExpanded: React.PropTypes.bool.isRequired,
  children: React.PropTypes.arrayOf(NodeType),
}).isRequired;

export default NodeType;

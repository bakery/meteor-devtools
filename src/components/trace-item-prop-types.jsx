import React from 'react';

export default {
  data: React.PropTypes.shape({
    isOutbound : React.PropTypes.bool.isRequired,
    message : React.PropTypes.object.isRequired,
    label : React.PropTypes.string,
    operation : React.PropTypes.string,
    request : React.PropTypes.object
  }).isRequired
};
import React from 'react';

export default {
  data: React.PropTypes.oneOfType([
      React.PropTypes.shape({
        _id : React.PropTypes.string,
        isOutbound : React.PropTypes.bool.isRequired,
        stackTrace : React.PropTypes.array,
        message : React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.arrat
        ]).isRequired,
        label : React.PropTypes.string,
        operation : React.PropTypes.string,
        request : React.PropTypes.object,
        warnings : React.PropTypes.array,
        size : React.PropTypes.number
      }),
      React.PropTypes.array
    ]).isRequired
};
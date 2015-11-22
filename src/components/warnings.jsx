import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    warnings : React.PropTypes.array.isRequired
  },


  renderWarning : function(warning){
    switch(warning){
      case 'user-overpublish':
        return (
          <li>
            This app is publishing too much data about people using it. To fix this, check out 'Don't over-publish your data' 
            section in <a href="http://joshowens.me/meteor-security-101/" target="_blank">Security 101</a> by Josh Owens
          </li>
        );
      default:
        return <li>unknown warning</li>; 

    }
  },

  render() {
    let warnings = this.props.warnings.map( (w) => {
      return this.renderWarning(w);
    });

    return (
      <ul className="warnings-list">{warnings}</ul>
    ) 
  }
})
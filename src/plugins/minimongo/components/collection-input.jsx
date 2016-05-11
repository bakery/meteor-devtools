import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default React.createClass({
  propTypes : {
    collectionName : PropTypes.string.isRequired,
    query: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired
  },

  handleChange: function(e) {
    this.props.onChange(this.props.collectionName, e.target.value);
  },

  render () {
    let inputClass = classNames('minimongo-input',
      {'error' : this.props.error}
    );

    return (
      <textarea 
        className={inputClass}
        onChange={this.handleChange}
        rows={1}
        spellCheck={false}
        value={this.props.query}
      />
    )
  }
});
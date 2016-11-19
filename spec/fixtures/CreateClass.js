import React from 'react';

const Button = React.createClass({
  propTypes: {
    level: React.PropTypes.oneOf([
      'primary', 'secondary', 'tertiary', 'quaternary', 'text', 'icon',
    ]),
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    height: React.PropTypes.number,
  },

  _setup() {
  },

  show() {
  },

  render() {
    return (
      <button disabled={this.props.disabled}>
        <b>{this.props.label}</b>
      </button>
    );
  },
});

export default Button;

import React from 'react';

const Text = ({text}) => {
  return <span>{text}</span>;
}

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
        <Text>{this.props.label}</Text>
      </button>
    );
  },
});

export default Button;

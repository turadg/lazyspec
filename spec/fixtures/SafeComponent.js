import React from 'react';

class SafeComponent extends React.Component {
  static propTypes = {
    level: React.PropTypes.oneOf([
      'primary', 'secondary', 'tertiary', 'quaternary', 'text', 'icon',
    ]),
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    height: React.PropTypes.number,
  };

  render() {
    return (
      <button disabled={this.props.disabled}>
        <b>{this.props.label}</b>
      </button>
    );
  }
}

export default SafeComponent;

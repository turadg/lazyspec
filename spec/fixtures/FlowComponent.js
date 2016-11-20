import React from 'react';

type Props = {
  disabled?: boolean,
  label: string,
  children: any,
};

class SafeComponent extends React.Component {
  props: Props;

  static defaltProps = {
    disabled: false,
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

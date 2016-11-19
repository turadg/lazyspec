import React from 'react';

class UnsafeComponent extends React.Component {
  static propTypes = {
    foo: React.PropTypes.instanceOf(React).isRequired,
  };

  render() {
    return (
      <button />
    );
  }
}

export default UnsafeComponent;

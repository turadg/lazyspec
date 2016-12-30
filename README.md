# LazySpec

Automatically generate minimal spec files for Javascript modules. Works well with Jest snapshots to make painless tests. For example, given a test file `src/components/Button.jsx`,
```
import React from 'react';

class Button extends React.Component {
  static propTypes = {
    level: React.PropTypes.oneOf([
      'primary', 'secondary', 'tertiary', 'quaternary', 'text', 'icon',
    ]),
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string.isRequired,
    height: React.PropTypes.number,
    children: React.PropTypes.element.isRequired,
  };

  render() {
    return (
      <button disabled={this.props.disabled}>
        <b>{this.props.label}</b>
      </button>
    );
  }
}

export default Button;
```

it will generate `src/components/__tests__/Button-test.js`:
```
/* @lazyspec (remove to manage manually) */
/* eslint-disable */
import Button from '../Button.js';

import React from 'react';
import renderer from 'react-test-renderer';

describe('Button', () => {
  it('exists', () => {
    expect(Button).toBeTruthy();
  });

  it('renders', () => {
    const comp = <Button children="mockElement" label="mockString" />;
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

```


## Usage

```
npm install -g lazyspec
lazyspec path/to/fileOrDir
```

For every dir in the list, it will glob all the `.js` and `.jsx` `.js` and add them.

For each file, it will generate a spec and the `__tests__` dir if necessary. So far it only supports the Jest style layout but PRs for other test runners and layouts are welcomed!

In dev you can do, `./src/cli.js path/to/fileOrDir`.

## Known Issues

- Required props of functional stateless components aren't detected

- Custom proptypes are never interpreted as required (e.g. `message: MessageInterfacePropType.isRequired`)

- Fails when more than one component is exported from a module. [react-docgen](https://github.com/reactjs/react-docgen) now has `findAllExportedComponentDefinitions`, but we don't use it because modules often export a HOC and its base component so it would be redundant. Eventually this tool could detect which is the HOC and omit it.

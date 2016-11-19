const fs = require('fs');

const describeModule = require('../../describeModule');
const specUnit = require('../jest');

function expectSpec(moduleName) {
  const src = fs.readFileSync(`spec/fixtures/${moduleName}.js`).toString();
  const description = describeModule(moduleName, src);

  const spec = specUnit(description);

  expect(spec).toMatchSnapshot();
}

describe('describeModule', () => {
  it('should describe simple exports', () => {
    expectSpec('esExports');
  });

  it('should describe a createClass component', () => {
    expectSpec('CreateClass');
  });

  it('should describe an ES6 component', () => {
    expectSpec('SafeComponent');
  });

  it('should describe an unsafe ES6 component', () => {
    expectSpec('UnsafeComponent');
  });

  it('should describe an ES6 with Flow component', () => {
    expectSpec('FlowComponent');
  });

  it('should describe a stateless function component', () => {
    expectSpec('StatelessFunction');
  });
});

const fs = require('fs');

const describeReact = require('../describeReact');

function expectDescription(moduleName) {
  const unitPath = `spec/fixtures/${moduleName}.js`;
  const src = fs.readFileSync(unitPath).toString();
  const description = describeReact(unitPath, src);

  expect(description).toMatchSnapshot();
}

describe('describeReact', () => {
  it('should describe simple exports', () => {
    expect(
      () => expectDescription('esExports'),
    ).toThrow();
  });

  it('should describe an ES5 component', () => {
    expectDescription('CreateClass');
  });

  it('should describe an ES6 component', () => {
    expectDescription('SafeComponent');
  });

  it('should describe an unsafe ES6 component', () => {
    expectDescription('UnsafeComponent');
  });

  it('should describe an ES6 with Flow component', () => {
    expectDescription('FlowComponent');
  });

  it('should describe a stateless function component', () => {
    expectDescription('StatelessFunction');
  });

  // Not currently supported by react-docgen
  it('should not describe multi-exports', () => {
    expect(
      () => expectDescription('MultipleComponents'),
    ).toThrowError('Multiple exported component definitions found.');
  });
});

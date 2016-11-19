const fs = require('fs');

const generateSpecFile = require('../generateSpecFile');

function expectSpec(moduleName) {
  const unitPath = `spec/fixtures/${moduleName}.js`;
  const specPath = `spec/fixtures/__tests__/${moduleName}-test.js`;
  const src = fs.readFileSync(unitPath).toString();

  const spec = generateSpecFile(moduleName, specPath, unitPath, src);
  expect(spec).toMatchSnapshot();
}

describe('generateSpecFile', () => {
  it('should describe simple exports', () => {
    expectSpec('esExports');
  });

  it('should describe an ES5 component', () => {
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

  it('should describe multi-exports', () => {
    expectSpec('MultipleComponents');
  });
});

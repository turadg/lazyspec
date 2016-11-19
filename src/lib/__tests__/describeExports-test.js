const fs = require('fs');

const describeExports = require('../describeExports');

function expectDescription(moduleName) {
  const unitPath = `spec/fixtures/${moduleName}.js`;
  const src = fs.readFileSync(unitPath).toString();
  const description = describeExports(unitPath, src);

  expect(description).toMatchSnapshot();
}

describe('describeExports', () => {
  it('should describe simple exports', () => {
    expectDescription('esExports');
  });

  it('should describe an ES5 component', () => {
    expectDescription('CreateClass');
  });

  it('should describe an ES6 component', () => {
    expectDescription('DefaultableComponent');
  });

  it('should describe an ES6 with Flow component', () => {
    expectDescription('FlowComponent');
  });

  it('should describe a stateless function component', () => {
    expectDescription('StatelessFunction');
  });

  it('should describe multi-exports', () => {
    expectDescription('MultipleComponents');
  });
});

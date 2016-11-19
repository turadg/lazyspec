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

  it('should describe multi-exports', () => {
    expectDescription('MultipleComponents');
  });
});

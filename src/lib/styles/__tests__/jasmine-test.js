const fs = require('fs');

const describeModule = require('../../describeModule');
const parseModule = require('../../parseModule');
const specUnit = require('../jasmine');

function expectSpec(moduleName) {
  const unitPath = `spec/fixtures/${moduleName}.js`;
  const src = fs.readFileSync(unitPath);
  const ast = parseModule(unitPath, src);
  const description = describeModule(moduleName, ast);

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
});

const fs = require('fs');

const describeModule = require('../../describeModule');
const specUnit = require('../jasmine');

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
});

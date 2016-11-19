const fs = require('fs');

const specUnit = require('../jasmine');

function expectSpec(moduleName) {
  const descriptionPath = `spec/fixtures/${moduleName}-description.json`;

  const description = JSON.parse(fs.readFileSync(descriptionPath));

  const spec = specUnit(description);

  expect(spec).toMatchSnapshot();
}

describe('describeModule', () => {
  it('should describe simple exports', () => {
    expectSpec('esExports');
  });

  it('should describe a simple component', () => {
    expectSpec('Button');
  });
});

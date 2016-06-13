const fs = require('fs');

const specUnit = require('../../../src/lib/styles/jasmine');

function expectSpec(moduleName) {
  const descriptionPath = `spec/fixtures/${moduleName}-description.json`;
  const specPath = `spec/fixtures/${moduleName}-jasmine.js`;

  const description = JSON.parse(fs.readFileSync(descriptionPath));

  const spec = specUnit(description);

  // for updating
  fs.writeFileSync(specPath, spec);

  const expectedSpec = fs.readFileSync(specPath, 'utf8');

  expect(spec).toEqual(expectedSpec);
}

describe('describeModule', () => {
  it('should describe simple exports', () => {
    expectSpec('esExports');
  });

  it('should describe a simple component', () => {
    expectSpec('Button');
  });
});

const fs = require('fs');

const describeModule = require('../../src/lib/describeModule');

function expectDescription(unitPath, astPath, descriptionPath) {
  const ast = JSON.parse(fs.readFileSync(astPath));

  const description = describeModule(unitPath, ast);

  // for updating
  // fs.writeFileSync(descriptionPath, JSON.stringify(description));

  const expectedDescription = JSON.parse(fs.readFileSync(descriptionPath));

  expect(description).toEqual(expectedDescription);
}

describe('describeModule', () => {
  it('should describe simple exports', () => {
    expectDescription(
      'spec/fixtures/esExports.js',
      'spec/fixtures/esExports-ast.json',
      'spec/fixtures/esExports-description.json'
    );
  });

  it('should describe a simple component', () => {
    expectDescription(
      'spec/fixtures/Button.jsx',
      'spec/fixtures/Button-ast.json',
      'spec/fixtures/Button-description.json'
    );
  });
});

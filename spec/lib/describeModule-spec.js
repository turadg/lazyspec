const fs = require('fs');

const describeModule = require('../../src/lib/describeModule');

function expectDescription(moduleName) {
  const unitPath = `spec/fixtures/${moduleName}.js`;
  const astPath = `spec/fixtures/${moduleName}-ast.json`;
  const descriptionPath = `spec/fixtures/${moduleName}-description.json`;

  const ast = JSON.parse(fs.readFileSync(astPath));

  const description = describeModule(moduleName, ast);

  // for updating
  // fs.writeFileSync(descriptionPath, JSON.stringify(description));

  const expectedDescription = JSON.parse(fs.readFileSync(descriptionPath));

  expect(description).toEqual(expectedDescription);
}

describe('describeModule', () => {
  it('should describe simple exports', () => {
    expectDescription('esExports');
  });

  it('should describe a simple component', () => {
    expectDescription('Button');
  });
});

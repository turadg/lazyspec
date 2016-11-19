const fs = require('fs');

const describeModule = require('../describeModule');

function expectDescription(moduleName) {
  const astPath = `spec/fixtures/${moduleName}-ast.json`;

  const ast = JSON.parse(fs.readFileSync(astPath));

  const description = describeModule(moduleName, ast);

  expect(description).toMatchSnapshot();
}

describe('describeModule', () => {
  it('should describe simple exports', () => {
    expectDescription('esExports');
  });

  it('should describe a simple component', () => {
    expectDescription('Button');
  });
});

const fs = require('fs');

const describeModule = require('../describeModule');
const parseModule = require('../parseModule');

function expectDescription(moduleName) {
  const unitPath = `spec/fixtures/${moduleName}.js`;
  const src = fs.readFileSync(unitPath);
  const ast = parseModule(unitPath, src);
  const description = describeModule(moduleName, ast);

  expect(description).toMatchSnapshot();
}

describe('describeModule', () => {
  it('should describe simple exports', () => {
    expectDescription('esExports');
  });

  it('should describe an ES5 component', () => {
    expectDescription('CreateClass');
  });

  xit('should describe an ES6 component', () => {
    expectDescription('DefaultableComponent');
  });

  xit('should describe an ES6 with Flow component', () => {
    expectDescription('FlowComponent');
  });
});

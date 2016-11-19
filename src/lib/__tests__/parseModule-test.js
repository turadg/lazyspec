const fs = require('fs');

const parseModule = require('../parseModule');

function expectAst(unitPath) {
  const src = fs.readFileSync(unitPath);
  const actualAst = parseModule(unitPath, src);

  expect(actualAst).toMatchSnapshot();
}

describe('parseModule', () => {
  it('should parse simple exports', () => {
    expectAst('spec/fixtures/esExports.js');
  });

  it('should parse a createClass component', () => {
    expectAst('spec/fixtures/CreateClass.js');
  });
});

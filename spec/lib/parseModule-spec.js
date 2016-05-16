const fs = require('fs');

const parseModule = require('../../src/lib/parseModule');

function expectAst(unitPath, astPath) {
  const src = fs.readFileSync(unitPath);
  const actualAst = JSON.parse(JSON.stringify(parseModule(unitPath, src)));

  // for updating
  // fs.writeFileSync(astPath, JSON.stringify(actualAst));

  const expectedAst = JSON.parse(fs.readFileSync(astPath));

  expect(actualAst).toEqual(expectedAst);
}

describe('parseModule', () => {
  it('should parse simple exports', () => {
    expectAst(
      'spec/fixtures/esExports.js',
      'spec/fixtures/esExports-ast.json'
    );
  });

  it('should parse a simple React component', () => {
    expectAst(
      'spec/fixtures/Button.jsx',
      'spec/fixtures/Button-ast.json'
    );
  });
});

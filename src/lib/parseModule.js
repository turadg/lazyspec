const recast = require('recast');
const {babylon} = require('react-docgen');

function parseModule(unitPath, src) {
  const ast = recast.parse(src, { esprima: babylon });

  return ast;
}

module.exports = parseModule;

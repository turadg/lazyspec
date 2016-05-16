const recast = require('recast');
const babylon = require('../react-docgen-subset/babylon');

function parseModule(unitPath, src) {
  const ast = recast.parse(src, { esprima: babylon });

  return ast;
}

module.exports = parseModule;

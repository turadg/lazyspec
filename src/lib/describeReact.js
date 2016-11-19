const docgen = require('react-docgen');

function describeReact(moduleName, src) {
  const componentInfo = docgen.parse(src);

  return componentInfo;
}

module.exports = describeReact;

const describeReact = require('./describeReact');
const describeExports = require('./describeExports');

function describeModule(moduleName, src) {
  // Would be nice to not parse twice. So far making react-docgen work with
  // the same AST has been a pain, but if this tool is too slow then that's a
  // clear optimization to try.
  const exportsInfo = describeExports(moduleName, src);
  let reactInfo = null;
  // will fail if there is no component
  try {
    reactInfo = describeReact(moduleName, src);
  } catch (_e) {
    // noop
  }

  return {
    exportsInfo,
    reactInfo,
  };
}

module.exports = describeModule;

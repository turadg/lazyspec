const unitToSpec = unitPath => unitPath.replace(/([^\/]*)\.js$/, '__tests__/$1-test.js');
const specToUnit = specPath => specPath.replace(/__tests__\/(.*)-test.js$/, '$1.js');

module.exports = {
  unitToSpec,
  specToUnit,
};

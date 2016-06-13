const _ = require('lodash');

const describeReact = require('./describeReact');

function nameExports({ declaration, specifiers }) {
  if (!declaration) {
    return specifiers.map(s => s.exported.name);
  } else if (declaration.id) {
    return [declaration.id.name];
  } else if (declaration.declarations) {
    return declaration.declarations.map(d => d.id.name);
  }

  throw new Error('unknown named export type');
}

function describeExports(moduleName, ast) {
  const body = ast.program.body;

  const namedExports = body.filter(node => node.type === 'ExportNamedDeclaration');
  const namedExportNames = _.flatMap(namedExports, nameExports);

  const defaultExport = body.find(node => node.type === 'ExportDefaultDeclaration');

  const defaultExportedAsName = _.includes(namedExportNames, moduleName);

  // ignore default export if it's also exported by name
  const exportsDefault = defaultExport && !defaultExportedAsName;

  const hasExports = exportsDefault || namedExportNames.length > 0;

  return {
    exportsDefault,
    hasExports,
    moduleName,
    namedExportNames,
  };
}

function describeModule(moduleName, ast) {
  const description = describeExports(moduleName, ast);

  const reactDescription = describeReact(ast);
  Object.assign(description, reactDescription);

  return description;
}

module.exports = describeModule;

const _ = require('lodash');
const babylon = require('babylon');

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

function describeAstExports(moduleName, ast) {
  const body = ast.program.body;

  const namedExports = body.filter(node => node.type === 'ExportNamedDeclaration' && node.exportKind === 'value');
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

function describeExports(moduleName, src) {
  const ast = babylon.parse(src, {
    sourceType: 'module',
    plugins: ['*'],
  });

  return describeAstExports(moduleName, ast);
}

module.exports = describeExports;

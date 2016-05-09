'use strict';

function getBindings(moduleInfo) {
  const hasDefault = !!moduleInfo.exportsDefault;
  const hasNames = moduleInfo.namedExportNames.length > 0;

  let bindings = '';
  if (hasDefault) {
    bindings += moduleInfo.moduleName;
  }
  if (hasDefault && hasNames) {
    bindings += ', ';
  }
  if (hasNames) {
    const names = moduleInfo.namedExportNames.join(', ');
    bindings += `{${names}}`;
  }
  return bindings;
}

function importDeclaration(moduleInfo, modulePath) {
  const bindings = getBindings(moduleInfo);
  return `import ${bindings} from '${modulePath}';`;
}

module.exports = importDeclaration;

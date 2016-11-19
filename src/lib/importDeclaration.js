function getBindings(exportsInfo) {
  const hasDefault = !!exportsInfo.exportsDefault;
  const hasNames = exportsInfo.namedExportNames.length > 0;

  let bindings = '';
  if (hasDefault) {
    bindings += exportsInfo.moduleName;
  }
  if (hasDefault && hasNames) {
    bindings += ', ';
  }
  if (hasNames) {
    const names = exportsInfo.namedExportNames.join(', ');
    bindings += `{${names}}`;
  }
  return bindings;
}

function importDeclaration({ exportsInfo }, modulePath) {
  const bindings = getBindings(exportsInfo);
  return `import ${bindings} from '${modulePath}';`;
}

module.exports = importDeclaration;

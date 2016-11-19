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

function importDeclaration({ exportsInfo, reactInfo }, modulePath) {
  const bindings = getBindings(exportsInfo);
  const unitLine = `import ${bindings} from '${modulePath}';`;

  if (reactInfo && reactInfo.props) {
    return `import React from 'react';
import renderer from 'react-test-renderer';

${unitLine}`;
  }

  return unitLine;
}

module.exports = importDeclaration;

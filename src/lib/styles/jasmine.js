function shouldExist(unitName) {
  return `
describe('${unitName}', () => {
  it('should exist', () => {
    expect(${unitName}).toBeTruthy();
  });
});
`;
}

function specUnit(moduleInfo) {
  const parts = [];

  if (moduleInfo.exportsDefault) {
    parts.push(shouldExist(moduleInfo.moduleName));
  }

  for (const namedExport of moduleInfo.namedExportNames) {
    parts.push(shouldExist(namedExport));
  }

  return parts.join('\n');
}

module.exports = specUnit;

function shouldExist(unitName) {
  return `
describe('${unitName}', () => {
  it('should exist', () => {
    expect(${unitName}).toBeTruthy();
  });
});
`;
}

function specUnit({ exportsInfo }) {
  const parts = [];

  if (exportsInfo.exportsDefault) {
    parts.push(shouldExist(exportsInfo.moduleName));
  }

  for (const namedExport of exportsInfo.namedExportNames) {
    parts.push(shouldExist(namedExport));
  }

  return parts.join('\n');
}

module.exports = specUnit;

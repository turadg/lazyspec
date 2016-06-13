#!/usr/bin/env node --harmony

/* eslint-disable no-console */

const fs = require('fs');
const glob = require('glob');
const path = require('path');
const mkdirp = require('mkdirp');

const describeModule = require('./lib/describeModule');
const importDeclaration = require('./lib/importDeclaration');
const specUnit = require('./lib/styles/jasmine');
const parseModule = require('./lib/parseModule');

const { unitToSpec } = require('./lib/layouts/loloTests');

const rootPath = process.argv[2];

const unitPaths = glob.sync('/**/*.js?(x)', { root: rootPath })
  .filter(src => src.indexOf('__tests__') === -1);

const lazyManaged = (specPath) => {
  const specSrc = fs.readFileSync(specPath, 'utf8');
  return specSrc.startsWith('/* @lazyspec');
};

const processUnit = (unitPath, src) => {
  console.log('Processing', unitPath);
  const pathInfo = path.parse(unitPath);
  const specPath = unitToSpec(unitPath);


  if (fs.existsSync(specPath)) {
    if (lazyManaged(specPath)) {
      console.warn(`Overwriting existing lazy spec ${specPath}`);
    } else {
      console.warn(`Leaving existing unlazy spec ${specPath}`);
      return;
    }
  }

  const ast = parseModule(unitPath, src);

  // '-' is not valid in a Javascript symbol and the separator isn't important for the spec
  const moduleName = pathInfo.name.replace('-', '');
  const moduleInfo = describeModule(moduleName, ast);

  if (!moduleInfo.hasExports) {
    console.warn('No exports in', unitPath);
    return;
  }

  const jasmineSpec = specUnit(moduleInfo);

  // why doesn't `relative` work without the slice?
  const importPath = path.relative(specPath, unitPath).slice(3);
  const importLine = importDeclaration(moduleInfo, importPath);

  const fileContents = `/* @lazyspec (remove to manage manually) */
/* eslint-disable max-len */
${importLine}
${jasmineSpec}
`;

  mkdirp(path.dirname(specPath));
  fs.writeFile(specPath, fileContents, 'utf8', (err2) => {
    if (err2) {
      console.error(err2);
    } else {
      console.log(`Created spec ${specPath}`);
    }
  });
};

for (const unitPath of unitPaths) {
  fs.readFile(unitPath, 'utf8', (err, src) => {
    if (err) {
      console.log('Could not read', unitPath, err);
      return;
    }
    try {
      processUnit(unitPath, src);
    } catch (ex) {
      console.error('Could not process unit', unitPath);
    }
  });
}

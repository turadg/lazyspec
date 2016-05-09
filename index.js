#!/usr/bin/env node

'use strict'; // eslint-disable-line

const babylon = require('babylon');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const mkdirp = require('mkdirp');

const describeModule = require('./lib/describeModule');
const importDeclaration = require('./lib/importDeclaration');
const specUnit = require('./lib/styles/jasmine');

const { unitToSpec, specToUnit} = require('./lib/layouts/loloTests');

const parseOptions = {
  ecmaVersion: 7,
  sourceType: 'module',
  plugins: [
    'asyncFunctions',
    'asyncGenerators',
    'classConstructorCall',
    'classProperties',
    'decorators',
    'doExpressions',
    'exponentiationOperator',
    'exportExtensions',
    'flow',
    'functionSent',
    'functionBind',
    'jsx',
    'objectRestSpread',
    'trailingFunctionCommas',
  ],
};

const rootPath = process.argv[2];

const unitPaths = glob.sync('/**/*.js', { root: rootPath })
  .filter(src => src.indexOf('__tests__') === -1);

for (const unitPath of unitPaths) {
  fs.readFile(unitPath, 'utf8', (err, data) => {
    console.log('Processing', unitPath);
    if (err) {
      console.log(err);
    }

    const pathInfo = path.parse(unitPath);
    const specPath = unitToSpec(unitPath);

    if (fs.existsSync(specPath)) {
      console.warn(`Leaving existing spec ${specPath}`);
      return;
    }

    // why doesn't `relative` work without the slice?
    const importPath = path.relative(specPath, unitPath).slice(3);

    const ast = babylon.parse(data, parseOptions);
    const moduleInfo = describeModule(pathInfo.name, ast);

    if (!moduleInfo.hasExports) {
      console.warn('No exports in', unitPath);
      return;
    }

    const importLine = importDeclaration(moduleInfo, importPath);
    const jasmineSpec = specUnit(moduleInfo, importPath);

    const fileContents = `${importLine}\n${jasmineSpec}`;

    mkdirp(path.dirname(specPath));
    fs.writeFile(specPath, fileContents, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
       console.log(`Created spec ${specPath}`);
      }
    });
  });
}

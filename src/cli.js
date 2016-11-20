#!/usr/bin/env node --harmony

/* eslint-disable no-console */

const _ = require('lodash');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const mkdirp = require('mkdirp');

const generateSpecFile = require('./lib/generateSpecFile');

const { unitToSpec } = require('./lib/layouts/loloTests');

const argv = require('yargs')
  .usage('Usage: $0 -t [system] <paths>')
  .default('t', 'jest')
  .describe('t', 'Testing type to target')
  .example('$0 -t jest lib/ foo.js', 'generate Jest specs for lib/** and foo.js')
  .demand(1)
  .help('h')
  .alias('h', 'help')
  .argv;


const argPaths = argv._;

const dirPaths = p => glob.sync('/**/*.js?(x)', { root: p })
  .filter(src => src.indexOf('__tests__') === -1);

const unitPaths = _.flatten(
  argPaths.map(p => (fs.lstatSync(p).isDirectory() ? dirPaths(p) : p))
);

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

  // '-' is not valid in a Javascript symbol and the separator isn't important for the spec
  const moduleName = pathInfo.name.replace('-', '');

  const fileContents = generateSpecFile(moduleName, specPath, unitPath, src);

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
  fs.readFile(unitPath, 'utf8', (err, srcBuffer) => {
    if (err) {
      console.log('Could not read', unitPath, err);
      return;
    }
    try {
      const src = srcBuffer.toString();
      processUnit(unitPath, src);
    } catch (ex) {
      console.error('Could not process unit', unitPath, ex.stack);
    }
  });
}

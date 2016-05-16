const recast = require('recast');
const docgen = require('react-docgen');
const Documentation = require('../react-docgen-subset/Documentation');

const resolver = docgen.resolver.findExportedComponentDefinition;

const defaultHandlers = [
  docgen.handlers.propTypeHandler,
  docgen.handlers.propTypeCompositionHandler,
  docgen.handlers.propDocBlockHandler,
  docgen.handlers.flowTypeHandler,
  docgen.handlers.flowTypeDocBlockHandler,
  docgen.handlers.defaultPropsHandler,
  docgen.handlers.componentDocblockHandler,
  docgen.handlers.displayNameHandler,
  docgen.handlers.componentMethodsHandler,
  docgen.handlers.componentMethodsJsDocHandler,
];

function executeHandlers(handlers, componentDefinitions) {
  return componentDefinitions.map(componentDefinition => {
    const documentation = new Documentation();
    handlers.forEach(handler => handler(documentation, componentDefinition));
    return documentation.toObject();
  });
}

function extractReactDocs(ast, handlers) {
  const componentDefinitions = resolver(ast.program, recast);

  if (Array.isArray(componentDefinitions)) {
    if (componentDefinitions.length === 0) {
      throw new Error('ERROR_MISSING_DEFINITION');
    }
    return executeHandlers(handlers, componentDefinitions);
  } else if (componentDefinitions) {
    return executeHandlers(handlers, [(componentDefinitions)])[0];
  }

  return null;
}

function describeReact(ast) {
  return extractReactDocs(ast, defaultHandlers);
}

module.exports = describeReact;

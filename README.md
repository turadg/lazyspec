# LazySpec

Automatically generate minimal spec files for Javascript modules.

## Benefits

1. Easy to ensure every module has at least one test (import). It can be hooked into git-commit or an editor.

2. Code coverage analysis requires importing. Without some test the module won't even be analyzed, inflating coverage metrics.


## Usage

```
npm install -g lazyspec
lazyspec path/to/modules
```

For every `.js` file under the path, lazyspec will generate a corresponding spec stub if there is none.

## TODO

Support more than [Jasmine](http://jasmine.github.io/) style. If you need another style, please file an issue or PR.

Shallow render React components when valid props can be generated. Using react-docgen.
https://github.com/reactjs/react-docgen/blob/master/bin/react-docgen.js
https://github.com/reactjs/react-docgen/blob/master/src/parse.js

./src/cli.js ~/Remind/r101-frontend/src/admin/components/


1. set up test suite to use Jest instead of Jasmine
2. use toMatchSnapshot for the ASTs
3. make tests for React test renderers
4. auto-generate tests from props

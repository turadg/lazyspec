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

Shallow render React components when valid props can be generated.

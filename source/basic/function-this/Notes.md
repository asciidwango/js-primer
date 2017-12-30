---
author: azu
---

## Table

- <https://azu.github.io/what-is-this/>
- [azu/what-is-this: What value is `this` in Strict, Script, or Module?](https://github.com/azu/what-is-this "azu/what-is-this: What value is `this` in Strict, Script, or Module?")

Notes: `const fn = () => this` はChrome64.0.3282.3では壊れている

| 実行環境   | Strict | コード                                     | 結果        |
| ------ | ------ | --------------------------------------- | --------- |
| Script | NO     | `this`                                  | global    |
| Script | NO     | `const fn = () => this`                 | global    |
| Script | NO     | `const fn = function(){ return this; }` | global    |
| Script | YES    | `this`                                  | global    |
| Script | YES    | `cons
t fn = () => this`                 | global    |
| Script | YES    | `const fn = function(){ return this; }` | undefined |
| Module | YES    | `this`                                  | undefined |
| Module | YES    | `const fn = () => this`                 | undefined |
| Module | YES    | `const fn = function(){ return this; }` | undefined |



## Reference

- https://tc39.github.io/ecma262/#sec-arrow-function-definitions-runtime-semantics-evaluation
- https://esdiscuss.org/topic/clarification-regarding-top-level-arrow-functions-and-this-arguments

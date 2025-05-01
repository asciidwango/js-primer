# Iterators and Generators

## このドキュメントについて

<!-- イテレータとジェネレータの基本的な概念、使い方、および関連するプロトコルについて解説します。 -->

この章では、JavaScriptにおけるイテレーション（反復処理）の仕組みであるイテレータと、イテレータを簡単に作成するためのジェネレータ関数について解説。ES2025で導入されるイテレータの新しいメソッドについても触れる。

## 想定読者

<!-- JavaScript Primerの読者層をベースに、この章を読む上で必要な知識を記述 -->

- JavaScriptの基本的な文法（特に配列、オブジェクト、関数、`for...of`ループ）の理解
- 非同期処理やデータストリームの扱いへの興味

## 背景

<!-- なぜこの章を追加するのか、技術的な背景や必要性を記述 -->

- ES2015でのイテレータとジェネレータ導入後、JavaScript Primerでは基本的な解説に留まっていた
- 近年の非同期処理の普及やデータストリーミング技術（例: LLMのServer-Sent Events）利用増加に伴う、イテレータやジェネレータの重要性の増大
- ES2025でのイテレータの新しいメソッド導入によるイテレータ操作の簡便化・宣言的記述への対応。基礎となるイテレータとジェネレータの解説の必要性

## 目的

<!-- この章を読むことで読者が何を学べるか、達成できることを記述 -->

- IterableプロトコルとIteratorプロトコルの仕組みの理解
- `for...of`ループの動作原理の理解
- ジェネレータ関数（`function*`と`yield`）の基本的な使い方の習得
- イテレータやジェネレータの有用なユースケースの理解
- ES2025で導入されるイテレータの新しいメソッドの基本的な使い方と利用のための基礎知識の習得

## 目的ではないこと

<!-- この章で扱わない範囲を明確にする -->

- 非同期イテレータ（Async Iterator）および非同期イテレータの新しいメソッドの詳細な解説（別機会）
- イテレータ/ジェネレータに関する全てのAPIや高度なテクニックの網羅
- 特定のライブラリやフレームワークにおけるイテレータ/ジェネレータの応用例の詳細な解説

## 使わない用語

- Iterator Helpers
    - これは仕様的な用語じゃなくて、ただ単にES2025で入った機能をまとめた呼び方で、将来性がないため、使わない
    - ES2026+とかで新しいものが増えたら破綻する概念なので使わない

## 方針

<!-- どのような構成や順序で解説を進めるか -->

- IterableプロトコルとIteratorプロトコルの基本概念の解説
- `for...of`ループとこれらのプロトコルの関係性の提示
- 組み込みのIterableオブジェクト（配列、文字列など）の紹介
- ジェネレータ関数の構文と基本的な使い方の解説
- イテレータの新しいメソッド (ES2025) の基本的なメソッド（例: `map`, `filter`, `take`, `toArray`など）の紹介とその利便性の提示
- 具体的なユースケース（遅延評価、無限シーケンス生成など）を通じた理解深化

## アウトライン
<!-- 章全体の構成案 -->

1.  **はじめに**: イテレーションの重要性とこの章の概要
2.  **IterableプロトコルとIteratorプロトコル**:
    - `Symbol.iterator`とは
    - Iteratorオブジェクトの`next`メソッド
    - `for...of`ループの仕組み
3.  **組み込みIterableオブジェクト**:
    - Array, String, Map, Setなど
4.  **ジェネレータ関数**:
    - `function*`構文
    - `yield`式
    - ジェネレータオブジェクト (`Generator`)
    - `yield*`式
5.  **イテレータの新しいメソッド (ES2025)**:
    - 導入の背景とメリット
    - 基本的なメソッドの紹介 (`.map`, `.filter`, `.take`, `.drop`, `.flatMap`, `.reduce`, `.toArray`, `.forEach`, `.some`, `.every`, `.find`)
    - メソッドを使ったコード例
6.  **ユースケース**:
    - 遅延評価（Lazy Evaluation）
    - 無限シーケンスの生成
    - データストリームの処理（概念）
7.  **まとめ**

## 参考

<!-- 関連する仕様やドキュメントへのリンク -->

- [ECMAScript Language Specification - Iteration](https://tc39.es/ecma262/#sec-iteration)
- [MDN Web Docs - Iteration protocols](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)
- [MDN Web Docs - Generator](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Generator)
- [Proposal: Iterator Helpers](https://github.com/tc39/proposal-iterator-helpers) (※ この文書内では「イテレータの新しいメソッド」として参照)
- [JavaScript Primer - 配列](https://jsprimer.net/basic/array/) (Iterableの例として)
- [JavaScript Primer - 非同期処理:Promise/Async Function](https://jsprimer.net/basic/async/) (関連する非同期の概念)

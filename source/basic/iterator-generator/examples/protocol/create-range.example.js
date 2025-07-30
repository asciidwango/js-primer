// 範囲の数値を生成するIterable Iteratorの実装
function createRange(start, end) {
    let current = start;
    return {
        // `current`が`end`以下の間、次の値を返し、`current`をインクリメントする
        // `end`を超えた場合は、doneをtrueにして終了
        next() {
            if (current <= end) {
                return { value: current++, done: false };
            } else {
                return { value: undefined, done: true };
            }
        },
        // Iterableプロトコル: Symbol.iteratorメソッドを実装
        [Symbol.iterator]() {
            return this;
        }
    };
}

// Iterable Iteratorを取得
const range = createRange(1, 3);
// Iteratorを取得
const iterator = range[Symbol.iterator]();
// Iteratorを使って、値を順番に取得
console.log(iterator.next().value); // => 1
console.log(iterator.next().value); // => 2
console.log(iterator.next().value); // => 3
console.log(iterator.next().value); // => undefined
// 範囲の数値を生成するIterable/Iteratorの実装
function createRange(start, end) {
    return {
        // Iterableプロトコル: Symbol.iteratorメソッドを実装
        [Symbol.iterator]() {
            let current = start;
            
            // Iteratorプロトコル: nextメソッドを持つオブジェクトを返す
            return {
                next() {
                    if (current <= end) {
                        return { value: current++, done: false };
                    } else {
                        return { value: undefined, done: true };
                    }
                }
            };
        }
    };
}

// 使用例
const range = createRange(1, 3);

// for...of ループで使用
for (const num of range) {
    console.log(num);
}
// => 1
// => 2
// => 3
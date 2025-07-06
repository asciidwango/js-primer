function createRange(start, end) {
    return {
        [Symbol.iterator]() {
            let current = start;
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

const range = createRange(1, 3);

// for...of ループと同等の処理を手動で実装
const iterator = range[Symbol.iterator](); // Iteratorを取得

let result = iterator.next();
while (!result.done) {
    const value = result.value;
    console.log(value); // ループ内の処理
    result = iterator.next(); // 次の値を取得
}
// => 1
// => 2
// => 3
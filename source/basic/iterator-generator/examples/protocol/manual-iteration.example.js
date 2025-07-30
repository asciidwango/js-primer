function createRange(start, end) {
    let current = start;
    return {
        next() {
            if (current <= end) {
                return { value: current++, done: false };
            } else {
                return { value: undefined, done: true };
            }
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const range = createRange(1, 3);

// Iteratorが{ done: true }を返すまで、`next`メソッドし、その`value`を取得する
for (const num of range) {
    console.log(num); // 1, 2, 3
}
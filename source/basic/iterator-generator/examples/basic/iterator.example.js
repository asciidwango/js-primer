// イテレータを使った場合：必要な時に値を生成
function* numberGenerator() {
    for (let i = 1; i <= 5000; i++) {
        yield i; // 値を一つずつ生成
    }
}

const iterator = numberGenerator();
// 最初の値
console.log(iterator.next().value); // => 1
// 次の値
console.log(iterator.next().value); // => 2

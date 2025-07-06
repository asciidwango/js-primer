// イテレータを使った場合：必要な時に値を生成
function* numberGenerator() {
    for (let i = 1; i <= 5000; i++) {
        yield i; // 値を一つずつ生成
    }
}

const iterator = numberGenerator();
console.log("最初の値: " + iterator.next().value); // => 最初の値: 1
console.log("次の値: " + iterator.next().value); // => 次の値: 2
// 必要な分だけメモリを使用
// イテレータを使った場合：必要な時に値を生成
function* numberGenerator() {
    for (let i = 1; i <= 5000; i++) {
        yield i; // 値を一つずつ生成
    }
}

const iterator = numberGenerator();
// nextメソッドを呼ぶと最初の値を返す
console.log(iterator.next().value); // => 1
// nextメソッドを呼ぶと次の値を返す
console.log("次の値: " + iterator.next().value); // => "次の値: 2"

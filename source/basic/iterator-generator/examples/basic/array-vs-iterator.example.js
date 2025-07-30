// 配列を使った場合：すべての数値を一度にメモリに作成
const numbers = [];
for (let i = 1; i <= 5000; i++) {
    numbers.push(i);
}
// 配列のサイズ
console.log(numbers.length); // => 5000

// すべてのデータがメモリに存在している
console.log(numbers.slice(0, 5)); // => [1, 2, 3, 4, 5]

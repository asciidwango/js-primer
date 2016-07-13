function findFirstEven(numbers) {
    // 偶数を探索する
    for (var i = 0; i < numbers.length; i++) {
        var item = numbers[i];
        if (item % 2 === 0) {
            return item;
        }
    }
}
var array = [1, 5, 10, 15, 20];
console.log(findFirstEven(array)); // => 10

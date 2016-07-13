var array = [1, 5, 10, 15, 20];
var result;
// 偶数を探索する
for (var i = 0; i < array.length; i++) {
    var item = array[i];
    if (item % 2 === 0) {
        result = item;
        break;
    }
}
console.log(result); // => 10

var numbers = [1, 5, 10, 15, 20];
// 偶数があるかどうか
var isEventIncluded = false;
for (var i = 0; i < numbers.length; i++) {
    var number = numbers[i];
    if (number % 2 === 0) {
        isEventIncluded = true;
        break;
    }
}
console.log(isEventIncluded); // => true

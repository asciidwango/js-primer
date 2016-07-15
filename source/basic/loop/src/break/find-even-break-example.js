function findFirstEven(numbers) {
    var result;
    for (var i = 0; i < numbers.length; i++) {
        var item = numbers[i];
        if (item % 2 === 0) {
            result = item;
            break;
        }
    }
    return result;
}
var array = [1, 5, 10, 15, 20];
console.log(findFirstEven(array)); // => 10

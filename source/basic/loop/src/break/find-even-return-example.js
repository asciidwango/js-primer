function findFirstEven(numbers) {
    for (var i = 0; i < numbers.length; i++) {
        var item = numbers[i];
        if (item % 2 === 0) {
            return item;
        }
    }
}
var numbers = [1, 5, 10, 15, 20];
console.log(findFirstEven(numbers)); // => 10

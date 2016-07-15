function isEven(number) {
    return number % 2 === 0;
}
var numbers = [1, 5, 10, 15, 20];
console.log(numbers.some(isEven)); // => true

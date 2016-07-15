function isEven(number) {
    return number % 2 === 0;
}

var array = [1, 5, 10, 15, 20];
console.log(array.filter(isEven)); // => [10, 20]

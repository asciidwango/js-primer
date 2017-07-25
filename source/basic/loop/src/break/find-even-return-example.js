function isEven(number) {
    return number % 2 === 0;
}
function isEventIncluded(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];
        if (isEven(number)) {
            return true;
        }
    }
}
const numbers = [1, 5, 10, 15, 20];
console.log(isEventIncluded(numbers)); // => true

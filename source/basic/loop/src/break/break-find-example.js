const numbers = [1, 5, 10, 15, 20];
// 偶数があるかどうか
let isEventIncluded = false;
for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    if (number % 2 === 0) {
        isEventIncluded = true;
        break;
    }
}
console.log(isEventIncluded); // => true

const numbers = [1, 5, 10, 15, 20];
// 偶数があるかどうか
let isEvenIncluded = false;
for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    // numが2で割り切れるなら偶数
    if (num % 2 === 0) {
        isEvenIncluded = true;
        break;
    }
}
console.log(isEvenIncluded); // => true

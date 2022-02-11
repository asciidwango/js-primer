class MyArray extends Array {
    get first() {
        return this.at(0);
    }

    get last() {
        return this.at(-1);
    }
}

const array = MyArray.from([1, 2, 3, 4, 5]);
console.log(array.first); // => 1
console.log(array.last); // => 5

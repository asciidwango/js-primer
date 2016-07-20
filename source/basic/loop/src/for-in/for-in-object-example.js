var object = {
    "a": 1,
    "b": 2,
    "c": 3
};
for (var key in object) {
    var value = object[key];
    console.log(`key:${key}, value:${value}`);
}
// "key:a, value:1"
// "key:b, value:2"
// "key:c, value:3"

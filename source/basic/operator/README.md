---
author: azu
---

# 演算子

演算子についてはたくさんの種類がありますが、必要になったら見るで問題無いでしょう。

演算子は `+` といった記号のこと
演算子は記号単独ではなく、対象をもって働きます。
演算子の対象のことを非演算子またはオペランドと呼ぶ。

演算子には２つのオペランドを取る二項演算子と
1つのオペランドを取る単項演算子があります。

## 二項演算子

### プラス （`+`）

```js
1 + 1; // => 2
```

### マイナス （`-`）

```js
42 - 1; // => 41
```

### 乗算 （`*`）

```js
2 * 8; // => 16
```

### 除算 （`/`）

```js
8 / 2; // => 4
```

### 剰余 （`%`）

```js
8 % 3; // => 2
```

### 指数演算子 （`**`） 

```js
2 ** 4; // => 2*2*2*2
```


### グループ演算子（`(`と`)`）

もっとも優先度を高くする。

```js
var a = 1;
var b = 2;
var c = 3;
a + b * c; // 7
(a + b) * c; // => 9
```

## 単項演算子（算術）
 
### 単項プラス （`+`）

```js
+1; // => 1
+"1"; // => 1
+"文字列"; // => NaN
```

### 単項マイナス （`-`）

```js
-1; // => -1
-"1"; // => -1
-"文字列"; // => NaN
```

### インクリメント （`++`）

```js
var num = 1;
num++; // => 1
console.log(num); // => 2
++num; // => 3
console.log(num); // => 3
```

### デクリメント （`--`）

```js
var num = 42;
num--; // => 42
console.log(num); // => 41
--num; // => 40
console.log(num); // => 40
```

## 比較演算子

### 等しい （`==`）

```js
1 == 1; // => true
1 == "1"; // => true
"str" == "str"; // => true
"JavaScript" == "ECMAScript"; // => false
true == true;// => true
```

`NaN`はNot a Numberで特殊。

```js
NaN == NaN; // => false
NaN != NaN; // => true
Number.isNaN(Nan);// => true
```

### 等しくない （`!=`）

```js
1 != 1; // => false
1 != "1"; // => false
"str" != "str"; // => false
"JavaScript" != "ECMAScript"; // => true
true != true;// => false
```

### 厳密に等しい （`===`）

**型変換**おきないため安全。

```js
1 === 1; // => true
1 === "1"; // => false
```

### 厳密に等しくない （`!==`）

```js
1 !== 1; // => false
1 !== "1"; // => true
```

### より大きい （`>`）

```js
42 > 21; // => true
42 > 42; // => false
```

### 以上 （`>=`）

```js
42 >= 42; // => true
42 > 42 || 42 == 42; // => true
```

### より小さい （`<`）

```js
21 < 42;// => true
42 < 42; // => false
```

### 以下 （`<=`）

```js
42 <= 42; // => true
42 < 42 || 42 == 42;// => true
```

## ビット演算子

### ビット論理積 （`&`）

```js
15     & 9;      // => 9
0b1111 & 0b1001; // => 0b1001
// ^__^     ^__^
0b1111 
& 0b1001; // => 0b1001
//  ^__^
```

### ビット論理和 （`|`）

```js
15     | 9;      // => 15
0b1111 | 0b1001; // => 0b1111
// ^^^^     ^^^^
0b1111 
| 0b1001; // => 0b1111
//  ^^^^
```

### ビット排他的論理和 （`^`）

```js
15     ^ 9;      // => 6
0b1111 ^ 0b1001; // => 0b0110
// _^^_     _^^_
0b1111 
^ 0b1001; // => 0b0110
//  _^^_
```

### ビット否定 （`~`）

```js
~15; // => -16
~0b1111; // => -0b10000
// ^^^^
~-1; // => 0
```

JavaScriptの`indexOf`は見つからなかった場合に-1を返す。
これを利用して `~-1` => 0、他がマイナスになることを利用して判定する人がいる。
ややこしいので使わなくてよい。

```js
~0; // => -1
~1; // => -2
```

### 左シフト（`<<`）

```js
0b1111 === 15;// => true
0b1111 << 2; // => 0b111100
```

### 右シフト（`>>`）


```js
0b1111 === 15;// => true
0b1111 >> 2; // => 0b11
-9 >> 2; // => -0b11
```
  

### ゼロ埋め右シフト（`>>>`）

```js
-9;        //    0b11111111111111111111111111110111
//              |              32bit             |
//              |                               ^^ 捨てられる
(-9) >>> 2;  // => 0b00111111111111111111111111111101
//                        ^^<-ゼロ埋め          -> 2個シフト
```
  
## 代入演算子（`=`）

```js
var version = 2015;
version = 2016;
```

## 条件（三項）演算子（`?`と`:`）

if文的な。

```js
var valueAorB = true ? "A" : "B";
console.log(value); // => "A";
var valueAorB = false ? "A" : "B";
console.log(value); // => "B";
```

## 論理演算子

### AND（`&&`）

```js
true && false; // => false
false && true; // => false
```

ユースケース。

```js
var value = "str";
if (typeof value === "string" && value === "str") {
    console.log(`${value} is string value`);
}
```

### OR（`||`）

```js
true || false; // => true
false || true; // => true
```

ユースケースとしてはデフォルト引数。

```js
function doSomething(arg) {
    var actualValue = arg || true;
    return actualValue;
}
doSomething(); // => true
actualValue("value"); // => "value"
```

## 文字列演算子（`+`）

文字列の結合。

```js
var value = "文字列" + "結合";
console.log(value); // => "文字列結合"
```

```js
var value = "文字列";
value += "結合";
console.log(value); // => "文字列結合"
```

## コンマ演算子（`,`）

```js
var a, b, c;
```

```js
var obj = {
    getThis() {
        return this;
    }
};
(0, obj.getThis)(); // => undefined
```


- [Why is (0,obj.prop)() not a method call?](http://www.2ality.com/2015/12/references.html "Why is (0,obj.prop)() not a method call?")

## 単項演算子（特殊）

### delete演算子

オブジェクトのプロパティ または 配列の指定した添字を削除する。

```js
var obj = { key: "value" };
delete obj.key;
console.log(obj.key); // => undefined
```

```js
var array = [5, 10];
delete array[0];
console.log(array[0]); // => undefined
console.log(array[1]); // => 10
```

変数を削除する演算子ではない。

<!-- textlint-disable -->

```js
var foo = "val";
delete foo; // => Error
```

<!-- textlint-enable -->

### typeof演算子

説明済み。プリミティブとオブジェクトの判定について。

```js
typeof "value"; // => "string"
typeof 42; // => "number"
```

### void演算子

`undefined`を返す特性を利用した圧縮やブックマークレットの仕組みに使われている。

```js
void 0;// => undefined
```

## 関係演算子

### in演算子

for...in文と同じ。

```js
var object = { "key": "value" };
"key" in object; // => true
Reflect.has(object, "key"); // => true
object.hasOwnProperty("key"); // => true
```

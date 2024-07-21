// 数値の文字列を受け取り数値を返す関数
// 'text' など数値にはならない文字列を渡された場合は例外を投げられる
function safeParseInt(numStr) {
    const num = Number.parseInt(numStr, 10);
    if (Number.isNaN(num)) {
        throw new Error(`${numStr} is not a numeric`);
    }
    return num;
}

// 数字の文字列を二つ受け取り、合計を返す関数
function sumNumStrings(a, b) {
    try {
        const aNumber = safeParseInt(a);
        const bNumber = safeParseInt(b);
        return aNumber + bNumber;
    } catch (e) {
        throw new Error("Failed to sum a and b", { cause: e });
    }
}

try {
    // 数値にならない文字列 'string' を渡しているので例外が投げられる
    sumNumStrings("string", "2");
} catch (err) {
    console.error(err);
}

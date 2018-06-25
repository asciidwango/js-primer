/**
 * 指定時間内にタイマーが発火されるなら成功、そうでないなら失敗
 * @param callback
 */
const tryTimeout = (callback) => {
    // タイマーのコールバックを呼び出すまでの時間（ミリ秒）
    const delay = 10;
    // タイマーのコールバックが呼ばれるまで待てる時間（ミリ秒）
    const limitOfDelay = delay * 2;
    const startTime = Date.now();
    setTimeout(() => {
        const diffTime = Date.now() - startTime;
        if (diffTime <= limitOfDelay) {
            callback(null, "許容時間内にタイマーが発火しました");
        } else {
            callback(new Error(`許容時間よりタイマーが発火できませんでした（${diffTime}ミリ秒）`));
        }
    }, delay);
};

tryTimeout((error, message) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(message);
});



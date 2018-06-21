const oneFrame = (callback) => {
    const startTime = Date.now();
    // 1xミリ秒 = 1フレーム後にコールバックを呼び出すように登録する
    setTimeout(() => {
        const endTime = Date.now();
        const diffTime = endTime - startTime;
        if (diffTime <= 16) {
            callback(null, "指定時間内にコールバックが呼ばれました");
        } else {
            callback(new Error(`コールバックが呼ばれるまで${diffTime}ミリ秒かかりました`));
        }
    }, 1);
};

// 100ms以内にコールバックが呼ばれれば成功、そうでないならタイムアウトエラー！
oneFrame((error, message) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(message);
});



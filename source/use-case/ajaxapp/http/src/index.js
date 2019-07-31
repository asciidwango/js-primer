function fetchUserInfo(userId) {
    fetch(`https://api.github.com/users/${userId}`)
        .then(response => {
            console.log(response.status);
            // エラーレスポンスが返されたことを検知する
            if (!response.ok) {
                console.error("サーバーエラー", response);
            } else {
                response.json().then(userInfo => {
                    console.log(userInfo);
                });
            }
        }).catch(error => {
            console.error("ネットワークエラー", error);
        });
}

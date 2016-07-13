function getUserInfo(userId) {
    const request = new XMLHttpRequest();
    request.open("GET", `https://api.github.com/users/${userId}`);
    request.addEventListener("load", (event) => {
        if (event.target.status != 200) {
            console.log(`${event.target.status}: ${event.target.statusText}`);
            return;
        }
        console.log(event.target.status);
        const responseText = event.target.responseText;
        const response = JSON.parse(responseText);
        console.log(response);
    });
    request.addEventListener("error", () => {
        console.error("Network Error");
    });
    request.send();
}
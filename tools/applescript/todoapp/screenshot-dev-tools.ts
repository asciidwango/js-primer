import { launchFirefox, quitFirefox, screenshotFirefox } from "../modules/firefox";
import { sendKeyStroke } from "../modules/keyboard-util";
import * as path from "path";
import { wait } from "../modules/wait";

const profileName = "js-primer";
const outputFilePath = path.resolve(path.join(__dirname, "../../../../source/use-case/todoapp/entrypoint/img/entry-point.png"));
console.log("outputFilePath", outputFilePath);
(async function () {
    await quitFirefox();
    await wait(1000);
    await launchFirefox({
        url: "http://127.0.0.1:8080",
        profileName
    });
    await wait(1000);
    await sendKeyStroke("i", {
        command: true,
        option: true
    });
    await wait(1000);
    await screenshotFirefox(outputFilePath);
    await quitFirefox();
})();

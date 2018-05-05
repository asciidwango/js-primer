import { launchFirefox, quitFirefox, setFirefoxWindowBounds } from "../modules/firefox";
import { wait } from "../modules/wait";
import meow = require("meow");
import { sendKeyStroke } from "../modules/keyboard-util";
const profileName = "js-primer";


const cli = meow(`
    Usage
      $ launch-firefox <input>
 
    Options
      --url         open url
 
    Examples
      $ launch-firefox --url "http://127.0.0.1:8080/final/final/"
`, {
        flags: {
            url: {
                type: 'string'
            }
        }
});
(async function () {
    await quitFirefox();
    await wait(1000);
    await launchFirefox({
        url: cli.flags.url,
        profileName
    });
    await wait(1000);
    await setFirefoxWindowBounds();
    await wait(1000);
    await sendKeyStroke("i", {
        command: true,
        option: true
    });
})();

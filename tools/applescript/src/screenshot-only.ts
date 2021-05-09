import { quitFirefox, screenshotFirefox, setFirefoxWindowBounds } from "../modules/firefox";
import * as path from "path";
import { wait } from "../modules/wait";
import meow = require("meow");


const cli = meow(`
    Usage
      $ screenshot-only <input>

    Options
      --output, -o  output path of image

    Examples
      $ screenshot --output ./output.png
`, {
    flags: {
        output: {
            type: 'string',
            alias: 'o',
            isRequired: true
        },
        continue: {
            type: 'boolean',
            isRequired: true
        }
    }
});
const outputFilePath = path.resolve(process.cwd(), cli.flags.output);
(async function () {
    await setFirefoxWindowBounds();
    await wait(1000);
    await screenshotFirefox(outputFilePath);
    if (!cli.flags.continue) {
        await quitFirefox();
    }
})();

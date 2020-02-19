import { run } from "@jxa/run";

export function launchFirefox({ url, profileName }: { url: string, profileName: string }) {
    return run((url, profileName) => {
        var app = Application.currentApplication();
        app.includeStandardAdditions = true;
        app.doShellScript(`open -a /Applications/Firefox.app --args -no-remote -CreateProfile '${profileName}'`);
        app.doShellScript(`open -a /Applications/Firefox.app --args -private-window '${url}' -no-remote -P '${profileName}'`);
    }, url, profileName);
}

export function setFirefoxWindowBounds() {
    return run(() => {
        const Firefox = Application("Firefox");
        Firefox.activate();
        Firefox.windows[0].bounds = { "x": 0, "y": 0, "width": 768, "height": 480 }
    });
}

export function quitFirefox() {
    return run(() => {
        const Firefox = Application("Firefox");
        Firefox.quit();
    });
}


export function screenshotFirefox(outputFilePath: string) {
    return run((outputFilePath) => {
        const app = Application.currentApplication();
        app.includeStandardAdditions = true;
        const Firefox = Application("Firefox");
        Firefox.activate();
        delay(0.3);
        const window = Firefox.windows[0];
        const windowId = String(window.id());
        app.doShellScript(`/usr/sbin/screencapture -o -l ${windowId} "${outputFilePath}"`);
    }, outputFilePath);
}

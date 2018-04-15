const runJxa: (fn: (...args: any[]) => any) => (...args: any[]) => Promise<void> = require('osa2');

export function launchFirefox({ url, profileName }: { url: string, profileName: string }) {
    return runJxa((url, profileName) => {
        var app = Application.currentApplication();
        app.includeStandardAdditions = true;
        app.doShellScript(`open -a /Applications/Firefox.app --args -no-remote -CreateProfile '${profileName}'`);
        app.doShellScript(`open -a /Applications/Firefox.app --args -private-window '${url}' -no-remote -P '${profileName}'`);
    })(url, profileName);
}

export function quitFirefox() {
    return runJxa(() => {
        const Firefox = Application("Firefox");
        Firefox.quit();
    })();
}


export function screenshotFirefox(outputFilePath: string) {
    return runJxa((outputFilePath) => {
        const app = Application.currentApplication();
        app.includeStandardAdditions = true;
        const Firefox = Application("Firefox");
        Firefox.activate();
        delay(0.3);
        const window = Firefox.windows[0];
        const windowId = String(window.id());
        app.doShellScript(`/usr/sbin/screencapture -l ${windowId} "${outputFilePath}"`);
    })(outputFilePath)
}

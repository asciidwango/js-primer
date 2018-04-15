function launchFirefox(url) {
    var app = Application.currentApplication();
    app.includeStandardAdditions = true;
    app.doShellScript("open -a /Applications/Firefox.app --args -no-remote -CreateProfile 'js-primer'");
    app.doShellScript("open -a /Applications/Firefox.app --args -private-window '" + url + "' -no-remote -P 'js-primer'");
}
function quitFirefox() {
    const Firefox = Application("Firefox");
    Firefox.quit();
}

function createModifier(modifierOption) {
    const modifiers = [];
    if (modifierOption.shift) {
        modifiers.push("shift down");
    }
    if (modifierOption.command) {
        modifiers.push("command down");
    }
    if (modifierOption.control) {
        modifiers.push("control down");
    }
    if (modifierOption.option) {
        modifiers.push("option down");

    }
    return modifiers;
}
function sendKeyStoroke(key, modifierOption) {
    const SystemEvents = Application("System Events");
    const Firefox = Application("Firefox");
    Firefox.activate();
    delay(1.0); // wait for active
    const modifiers = createModifier(modifierOption);
    console.log(modifiers);
    SystemEvents.keystroke(key, { using: modifiers });
}

function screenshotFirefox(outputFilePath) {
    const app = Application.currentApplication();
    app.includeStandardAdditions = true;
    const Firefox = Application("Firefox");
    Firefox.activate();
    delay(0.3);
    const window = Firefox. [0];
    const windowId = String(window.id());
    app.doShellScript(`/usr/sbin/screencapture -l ${windowId} "${outputFilePath}"`);
}


quitFirefox();
delay(1.0);
launchFirefox("http://127.0.0.1:8080");
delay(1.0);
sendKeyStoroke("i", {
    command: true,
    option: true
});
delay(1.0);
screenshotFirefox("/Users/azu/.ghq/github.com/asciidwango/js-primer/tools/applescript/out.png");

import { run } from "@jxa/run";

export type ModifierOption = {
    shift?: boolean;
    control?: boolean;
    option?: boolean;
    command?: boolean;
};


function createModifier(modifierOption: ModifierOption) {
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

export function sendKeyStroke(key: string, modifierOption: ModifierOption) {
    const modifiers = createModifier(modifierOption);
    return run((key, modifiers) => {
        const SystemEvents = Application("System Events");
        const Firefox = Application("Firefox");
        Firefox.activate();
        delay(1.0); // wait for active
        SystemEvents.keystroke(key, { using: modifiers });
    }, key, modifiers);
}

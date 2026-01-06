import { Page } from "@playwright/test";

export type ConsoleMessage = {
    type: string;
    text: string;
};

/**
 * console.logをキャプチャしながらページを訪問
 */
export async function visitWithConsole(
    page: Page,
    url: string
): Promise<{ consoleLogs: ConsoleMessage[] }> {
    const consoleLogs: ConsoleMessage[] = [];

    page.on("console", (msg) => {
        consoleLogs.push({
            type: msg.type(),
            text: msg.text(),
        });
    });

    await page.goto(url);
    return { consoleLogs };
}

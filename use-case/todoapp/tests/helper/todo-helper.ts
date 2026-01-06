import { Page } from "@playwright/test";

/**
 * TODOアイテムを追加
 */
export async function addNewTodo(page: Page, title: string): Promise<void> {
    await page.locator("#js-form-input").fill(title);
    await page.locator("#js-form-input").press("Enter");
}

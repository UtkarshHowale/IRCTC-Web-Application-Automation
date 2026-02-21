export class BasePage {

    constructor(page) {
        /** @type {import('@playwright/test').Page} */
        this.page = page;
    }

    // ==================================================
    // Navigation Methods
    // ==================================================

    async navigateTo(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
}

    async refresh() {
        await this.page.reload();
    }

    async goBack() {
        await this.page.goBack();
    }

    async goForward() {
        await this.page.goForward();
    }

    // ==================================================
    // Click & Mouse Actions
    // ==================================================

    async click(locator) {
        await locator.click();
    }

    async doubleClick(locator) {
        await locator.dblclick();
    }

    async hover(locator) {
        await locator.hover();
    }

    // ==================================================
    // Input Actions
    // ==================================================

    async enterValueInto(locator, value) {
        await locator.fill(value);
    }

    async enterValueSlowerInto(locator, value) {
        await locator.pressSequentially(value);
    }

    async selectByValue(locator, value) {
        await locator.selectOption(value);
    }

    async selectByLabel(locator, label) {
        await locator.selectOption({ label });
    }

    // ==================================================
    // State Verification Methods
    // ==================================================

    async isVisible(locator) {
        return await locator.isVisible();
    }

    async isChecked(locator) {
        return await locator.isChecked();
    }

    async isEnabled(locator) {
        return await locator.isEnabled();
    }

    // ==================================================
    // Text / Data Retrieval
    // ==================================================

    async getText(locator) {
        return await locator.textContent();
    }

    async getAllTexts(locator) {
        return await locator.allTextContents();
    }

    // ==================================================
    // Scroll Methods
    // ==================================================

    async scrollIntoView(locator) {
        await locator.scrollIntoViewIfNeeded();
    }

    async scrollToBottom() {
        await this.page.evaluate(() =>
            window.scrollTo(0, document.body.scrollHeight)
        );
    }

    async scrollToTop() {
        await this.page.evaluate(() =>
            window.scrollTo(0, 0)
        );
    }

    // ==================================================
    // Explicit Wait Methods (Use Only When Needed)
    // ==================================================

    async waitForVisible(locator) {
        await locator.waitFor({ state: 'visible' });
    }

    async waitForHidden(locator) {
        await locator.waitFor({ state: 'hidden' });
    }

}
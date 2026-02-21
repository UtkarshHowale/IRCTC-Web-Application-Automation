import { BasePage } from "./BasePage";

export class TrainListPage extends BasePage {

    constructor(page) {
        /** @type {import('@playwright/test').Page} */
        super(page);
        this.TRAIN_HEADING_LOCATOR = this.page.locator('.train-heading');
    }

    async getTrainCount() {
        const getTrainCount = await this.TRAIN_HEADING_LOCATOR.count();
        return getTrainCount;
    }

}
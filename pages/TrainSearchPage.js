import { BasePage } from "./BasePage";

export class TrainSearchPage extends BasePage {

    constructor(page) {
        /** @type {import('@playwright/test').Page} */
        super(page);
        this.FROM_STATION_LOCATOR = this.page.getByLabel("Enter From station");
        this.TO_STATION_LOCATOR = this.page.getByLabel("Enter To station");
        this.ALERT_MODEL_LOCATOR = this.page.locator("//button[contains(@aria-label, 'Confirmation')]");
        this.TRAIN_SEARCH_SUGGESSION_LIST_LOCATOR = this.page.locator('.ui-autocomplete-panel');
        this.CALENDER_INPUT_LOCATOR = this.page.getByLabel("Enter Journey Date");
        this.TODAY_DATE_LOCATOR = this.page.locator('td.ui-datepicker-today');
        this.TRAIN_SEARCH_BUTTON_LOCATOR = this.page.locator("button[class='search_btn train_Search']");

    }

    async navigateOnTheTrainSearchPage(baseUrl) {
        await this.navigateTo(baseUrl);
    }

    async acceptAlertModal() {
        try {
            await this.click(this.ALERT_MODEL_LOCATOR);
        } catch (Exception) {
            console.log('Alert modal is not visible and we are moving ahed...')
        }
    }

    async isFromStationVisibleAndEnabled() {

        const isFromStationVisible = await this.isVisible(this.FROM_STATION_LOCATOR);
        const isFromStationEnabled = await this.isEnabled(this.FROM_STATION_LOCATOR);

        return { isFromStationVisible, isFromStationEnabled }
    }

    async searchTrains(fromStationName, toStationName) {
        await this.enterValueSlowerInto(this.FROM_STATION_LOCATOR, fromStationName);
        await this.selectValueFromAutoSuggestiveList(this.TRAIN_SEARCH_SUGGESSION_LIST_LOCATOR, fromStationName);
        await this.enterValueSlowerInto(this.TO_STATION_LOCATOR, toStationName);
        await this.selectValueFromAutoSuggestiveList(this.TRAIN_SEARCH_SUGGESSION_LIST_LOCATOR, toStationName);
        await this.click(this.TRAIN_SEARCH_BUTTON_LOCATOR);
    }
}


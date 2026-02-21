import { BasePage } from "./BasePage";

export class TrainSearchPage extends BasePage {

    constructor(page) {
        /** @type {import('@playwright/test').Page} */
        super(page);
        this.FROM_STATION_LOCATOR = this.page.locator("//input[contains(@aria-label,'Enter From station')]");
        this.TO_STATION_LOCATOR = this.page.locator("//input[contains(@aria-label,'Enter To station')]");

        this.ALERT_MODEL_LOCATOR = this.page.locator("//button[contains(@aria-label, 'Confirmation')]");
        this.TRAIN_SEARCH_SUGGESSION_LIST_LOCATOR = this.page.locator('.ui-autocomplete-panel');
        this.CALENDER_INPUT_LOCATOR = this.page.getByLabel("Enter Journey Date");
        this.TODAY_DATE_LOCATOR = this.page.locator('td.ui-datepicker-today');
        this.TRAIN_SEARCH_BUTTON_LOCATOR = this.page.locator("button[class='search_btn train_Search']");

        this.FROM_AUTOCOMPLETE_WRAPPER = this.page.locator('p-autocomplete[formcontrolname="origin"]');
        this.TO_AUTOCOMPLETE_WRAPPER = this.page.locator('p-autocomplete[formcontrolname="destination"]');

        this.FROM_SUGGESTIONS = this.FROM_AUTOCOMPLETE_WRAPPER.locator("li[role='option']");
        this.TO_SUGGESTIONS = this.TO_AUTOCOMPLETE_WRAPPER.locator("li[role='option']");

        this.FROM_STATION_PLACEHOLDER_LOCATOR = this.page.getByLabel('From');
        this.TO_STATION_PLACEHOLDER_LOCATOR = this.page.getByLabel('To');

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
    async isToStationVisibledAndEnabled() {
        const isToStationVisible = await this.isVisible(this.TO_STATION_LOCATOR);
        const isToStationEnabled = await this.isEnabled(this.TO_STATION_LOCATOR);

        return { isToStationVisible, isToStationEnabled }
    }

    async enterFromStation(stationName) {
        await super.enterValueInto(this.FROM_STATION_LOCATOR, stationName);
    }

    async enterToStation(stationName) {
        await super.enterValueInto(this.TO_STATION_LOCATOR, stationName);
    }


    async getFromStationSuggestionCount() {
        await this.FROM_SUGGESTIONS.first().waitFor({ state: 'visible' });
        return await this.FROM_SUGGESTIONS.count();
    }
    async getToStationSuggestionCount() {
        await this.TO_SUGGESTIONS.first().waitFor({ state: 'visible' });
        return await this.TO_SUGGESTIONS.count();
    }


    async getAllFromStationSuggestions() {
        await this.FROM_SUGGESTIONS.first().waitFor({ state: 'visible' });
        const suggestions = await this.FROM_SUGGESTIONS.allTextContents();
        return suggestions.map(text => text.trim());
    }
}


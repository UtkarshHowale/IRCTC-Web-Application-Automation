import { test, expect } from '@playwright/test';
import { TrainSearchPage } from '../pages/TrainSearchPage';

/** @type {TrainSearchPage} */
let trainSearchPage;

test.beforeEach('Train Search Functionality Test Cases', async ({ page }) => {
    trainSearchPage = new TrainSearchPage(page);
    await trainSearchPage.navigateOnTheTrainSearchPage('https://www.irctc.co.in/nget/train-search');
    await trainSearchPage.acceptAlertModal();
});

test('TC_01 Verify that the From Station field is visible and enabled.', async () => {
    const fromStationFieldStatus = await trainSearchPage.isFromStationVisibleAndEnabled();
    expect(fromStationFieldStatus.isFromStationVisible).toBeTruthy();
    expect(fromStationFieldStatus.isFromStationEnabled).toBeTruthy();
})

test('TC_02 Verify that station suggestions appear when the user enters a city name', async () => {
    await trainSearchPage.enterFromStation('Pune');
    const suggestionCount = await trainSearchPage.getFromStationSuggestionCount();
    expect(suggestionCount).toBeGreaterThan(0);
})

test('TC_03 Verify that only valid city names appear in the suggestion list', async () => {
    await trainSearchPage.enterFromStation('Pune');

    const suggestions = await trainSearchPage.getAllFromStationSuggestions();

    expect(suggestions.length).toBeGreaterThan(0);

    for (const suggestion of suggestions) {
        if (suggestion.includes('----- Stations -----')) {
            continue;
        }
        expect(suggestion.toLowerCase()).toContain('pune');
    }
});

test('TC_04 Verify that invalid city names do not appear in the suggestion list.', async () => {

    const invalidSearchText = 'rajpuri';

    await trainSearchPage.enterFromStation(invalidSearchText);

    const suggestions = await trainSearchPage.getAllFromStationSuggestions();

    // Validate that invalid search text is NOT present in any suggestion
    const isInvalidPresent = suggestions.some(suggestion =>
        suggestion.toLowerCase().includes(invalidSearchText.toLowerCase())
    );

    expect(isInvalidPresent).toBeFalsy();
});

test('TC_05 Verify that the placeholder text is visible before entering a city name.', async () => {
    await expect(trainSearchPage.FROM_STATION_PLACEHOLDER_LOCATOR).toBeVisible();
});

test('TC_08 Verify that the To City field is visible and enabled.', async () => {
    const toStationFieldStatus = await trainSearchPage.isToStationVisibledAndEnabled();
    expect(toStationFieldStatus.isToStationVisible).toBeTruthy();
    expect(toStationFieldStatus.isToStationEnabled).toBeTruthy();
});

test('TC_09 Verify that station suggestions appear when the user enters a To Station name.', async () => {

    await trainSearchPage.enterToStation('Thane');

    const suggestionCount = await trainSearchPage.getToStationSuggestionCount();

    expect(suggestionCount).toBeGreaterThan(0);
});



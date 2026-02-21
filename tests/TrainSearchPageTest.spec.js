import { test, expect } from '@playwright/test';
import { TrainSearchPage } from '../pages/TrainSearchPage';
import {TrainListPage} from '../pages/TrainListPage'

/** @type {TrainSearchPage} */
let trainSearchPage;
/** @type {TrainListPage} */
let trainListPage;

test.beforeEach('Train Search Functionality Test Cases', async ({ page }) => {
    trainSearchPage = new TrainSearchPage(page);
    trainListPage = new TrainListPage(page);
    await trainSearchPage.navigateOnTheTrainSearchPage('https://www.irctc.co.in/nget/train-search');
    await trainSearchPage.acceptAlertModal();
});

test('TC_01 Verify that the From Station field is visible and enabled.', async () => {
    const fromStationFieldStatus = await trainSearchPage.isFromStationVisibleAndEnabled();
    expect(fromStationFieldStatus.isFromStationVisible).toBeTruthy();
    expect(fromStationFieldStatus.isFromStationEnabled).toBeTruthy();
});


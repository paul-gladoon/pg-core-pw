import { test } from '@playwright/test';
import { MainPage, IMainPage } from '../po/main-page/main.page';
import path from 'path';
import {CheckboxPage, ICheckboxPage} from '../po/checkbox-page/checkbox.page';
import {Keys} from '../lib/utils/keys';
import {ISelectPage, SelectPage} from '../po/select-page/select.page';

test('some test', async ({ page }) => {
  const main = new MainPage(page) as IMainPage
  await main.goToPage()
  await main.hover({searchBtn: null})
  await main.get({searchBtn: {color: null}})
  await main.scroll({searchBtn: null})
  await main.isExist({searchBtn: null})
  await main.isDisplay({searchBtn: null})
  await main.getScreenshot({searchBtn: {filePath: path.resolve(process.cwd(), './screens/link.png')}})
  await main.waitForDataState({searchBtn: {expectedState: {attribute: {class: 'DocSearch'}}, includes: true}}, 5000)
  await main.waitForDisplayedState({searchBtn: true})
  await main.click({searchBtn: null})
  await main.sendKeys({searchInput: 'Locator' + Keys.ENTER})
});

test('checkbox', async ({ page }) => {
  const checkboxPage = new CheckboxPage(page) as ICheckboxPage
  await checkboxPage.goToPage()
  await checkboxPage.sendKeys({checkbox: true})
})

test('select', async ({ page }) => {
  const selectPage = new SelectPage(page) as ISelectPage
  await selectPage.goToPage()
  await selectPage.sendKeys({select: {label: 'b'}})
})

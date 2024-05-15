import {test} from '../fixtures'
import path from 'path'
import {Keys} from '../lib/utils/keys'

test('some test', async ({pageProvider: {main}}) => {
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
})

test('tabber, consoler', async ({pageProvider: {main, githubPWPage}}) => {
  await main.goToPage()
  await main.click({github: null})
  await githubPWPage._tabber.sendKeys({switchTab: {url: 'https://github.com/microsoft/playwright'}})
  await githubPWPage._tabber.waitForDataState({expectedState: {url: 'https://github.com/microsoft/playwrig'}, includes: true})
  await githubPWPage._tabber.sendKeys({refresh: true})
  await githubPWPage._consoler.get({readyState: null})
  await githubPWPage.click({home: null})
  await main._tabber.sendKeys({switchTab: {defaultTab: true}})
  await main.click({github: null})
  await githubPWPage._tabber.sendKeys({switchTab: {index: 2}})
  await githubPWPage.click({home: null})
})

test('actioner', async ({pageProvider: {main}}) => {
  await main.goToPage()
  await main.click({searchBtn: null})
  await main._actioner.sendKeys([Keys.A])
})

test('collection fragments', async ({pageProvider: {main}}) => {
  await main.goToPage()
  await main.get({navigationBars: {by: {index: 0}, navItem: {navItems: {action: {attribute: 'href'}}}}})
})

test('checkbox', async ({pageProvider: {checkboxPage}}) => {
  await checkboxPage.goToPage()
  await checkboxPage.sendKeys({checkbox: true})
})

test('select', async ({pageProvider: {selectPage}}) => {
  await selectPage.goToPage()
  await selectPage.sendKeys({select: {label: 'b'}})
})

test('new tab test', async ({pageProvider: {main}}) => {
  await main.goToPage()
  await main._tabber.sendKeys({newTab: 'https://www.google.com/'})
})

test('set window size', async ({pageProvider: {main}}) => {
  await main.goToPage()
  await main._tabber.sendKeys({setWindowSize: {width: 1560, height: 960}})
})

test('navigation to url', async ({pageProvider: {main}}) => {
  await main.goToPage()
  await main._tabber.sendKeys({navigateToUrl: 'https://www.google.com/'})
})

test('get window size', async ({pageProvider: {main}}) => {
  await main.goToPage()
  await main._tabber.get({windowSize: null})
})

test('_root check', async ({pageProvider: {main}}) => {
  await main.goToPage()
  await main.click({_root: null, header: {_root: null}})
})

import {test} from '../fixtures'
import path from 'path'
import {Keys} from '../lib/utils/keys'
import {expect} from '@playwright/test'

test('some test', async ({pageProvider: {main}}) => {
  await main.goToPage()
  await main.hover({searchBtn: null})
  await main.get({searchBtn: {color: null}})
  await main.scroll({searchBtn: null})
  await main.isExist({searchBtn: null})
  await main.isDisplay({searchBtn: null})
  await main.getScreenshot({searchBtn: {filePath: path.resolve(process.cwd(), './screens/link.png')}})
  await main.waitForDataState({searchBtn: {_where: {attribute: {class: 'DocSearch'}}, _includes: true}}, 5000)
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
  await main.get({navigationBars: {by: {index: 0}, navItem: {navItems: {_action: {attribute: 'href'}}}}})
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

test('parent element check', async ({pageProvider: {main}}) => {
  await main.goToPage()
  await main.get({apiItem: {attribute: 'href'}})
})

test('collection elements click', async ({pageProvider: {main}}) => {
  await main.goToPage()
  await main.click({navItems: {_action: null, _where: {text: 'API'}}})
  await main.click({navItems: {_action: null, _index: 1}})
  await main.click({navItems: {_action: null}})
})

test('collection elements hover', async ({pageProvider: {main}}) => {
  await main.goToPage()
  await main.hover({navItems: {_action: null, _where: {text: 'API'}}})
  await main.hover({navItems: {_action: null, _index: 1}})
  await main.hover({navItems: {_action: null}})
})

test('collection elements waitForDataState', async ({pageProvider: {main}}) => {
  await main.goToPage()
  const result1 = await main.waitForDataState({navItems: {_length: 6}})
  await expect(result1).toBeTruthy()
  const result2 = await main.waitForDataState({navItems: {_length: '>=6'}})
  await expect(result2).toBeTruthy()
  const result3 = await main.waitForDataState({navItems: {_every: true, _where: {tagName: 'A'}}})
  await expect(result3).toBeFalsy()
  const result4 = await main.waitForDataState({navItems: {_some: true, _where: {tagName: 'A'}}})
  await expect(result4).toBeTruthy()
  const result5 = await main.waitForDataState({navItems: {_index: 1, _where: {tagName: 'A'}}})
  await expect(result5).toBeTruthy()
  const result6 = await main.waitForDataState({navItems: {_some: true, _where: {text: 'AP'}, _includes: true}})
  await expect(result6).toBeTruthy()
})

test('collection elements waitForDisplayedState', async ({pageProvider: {main}}) => {
  await main.goToPage()
  const all = await main.waitForDisplayedState({navItems: {_state: true}})
  expect(all).toBeTruthy()
  const every = await main.waitForDisplayedState({navItems: {_state: true, _every: true}})
  expect(every).toBeTruthy()
  const some = await main.waitForDisplayedState({navItems: {_state: true, _some: true}})
  expect(some).toBeTruthy()
  const index = await main.waitForDisplayedState({navItems: {_state: true, _index: 4}})
  expect(index).toBeTruthy()
})

test('collection elements get', async ({pageProvider: {main}}) => {
  await main.goToPage()
  const {
    navItems: {_length},
  } = await main.get({navItems: {_length: null}})

  expect(typeof _length === 'number').toBeTruthy()

  const {navItems: navItemsAll} = await main.get({navItems: {_action: {text: null}}})

  expect(navItemsAll.every((el) => typeof el.text === 'string')).toBeTruthy()

  const {
    navItems: {tagName},
  } = await main.get({navItems: {_action: {tagName: null}, _where: {text: 'API'}}})

  expect(tagName).toBe('A')

  const {
    navItems: {tagName: tagNameByIndex},
  } = await main.get({navItems: {_action: {tagName: null}, _index: 0}})

  expect(tagNameByIndex).toBe('A')
})

test('collection elements isDisplay', async ({pageProvider: {main}}) => {
  await main.goToPage()
  const {navItems} = await main.isDisplay({navItems: {_action: null, _index: 0}})

  expect(navItems).toBeTruthy()

  const {navItems: navItemsWhere} = await main.isDisplay({navItems: {_action: null, _where: {text: 'API'}}})

  expect(navItemsWhere).toBeTruthy()

  const {navItems: navItemsAll} = await main.isDisplay({navItems: {_action: null}})

  expect(navItemsAll.every((el) => el)).toBeTruthy()
})

test('collection elements isExist', async ({pageProvider: {main}}) => {
  await main.goToPage()
  const {navItems} = await main.isExist({navItems: {_action: null, _index: 0}})

  expect(navItems).toBeTruthy()

  const {navItems: navItemsWhere} = await main.isExist({navItems: {_action: null, _where: {text: 'API'}}})

  expect(navItemsWhere).toBeTruthy()

  const {navItems: navItemsAll} = await main.isExist({navItems: {_action: null}})

  expect(navItemsAll.every((el) => el)).toBeTruthy()
})

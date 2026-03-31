import {test} from '../fixtures'
import path from 'path'
import {Keys} from '../lib/utils/keys'
import {expect} from '@playwright/test'

test('some test', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
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

test('tabber, consoler', async ({pageProvider: {main, githubPWPage}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  await main.click({github: null})
  await githubPWPage._tabber.sendKeys({switchTab: {url: urls.playwright.github}})
  await githubPWPage._tabber.waitForDataState({expectedState: {url: urls.playwright.github}, includes: true})
  await githubPWPage._tabber.sendKeys({refresh: true})
  await githubPWPage._consoler.get({readyState: null})
  await githubPWPage.click({home: null})
  await main._tabber.sendKeys({switchTab: {defaultTab: true}})
  await main.click({github: null})
  await githubPWPage._tabber.sendKeys({switchTab: {index: 2}})
  await githubPWPage.click({home: null})
})

test('actioner', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  await main.click({searchBtn: null})
  await main._actioner.sendKeys([Keys.A])
})

test('collection fragments', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  await main.get({navigationBars: {_index: 0, navItems: {_action: {attribute: 'href'}}}})
})

test('checkbox', async ({pageProvider: {checkboxPage}, data: {urls}}) => {
  await checkboxPage._tabber.sendKeys({goto: urls.testElements.checkbox})
  await checkboxPage.sendKeys({checkbox: true})
})

test('select', async ({pageProvider: {selectPage}, data: {urls}}) => {
  await selectPage._tabber.sendKeys({goto: urls.testElements.select})
  await selectPage.sendKeys({select: {label: 'b'}})
})

test('new tab test', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  await main._tabber.sendKeys({newTab: 'https://www.google.com/'})
})

test('set window size', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  await main._tabber.sendKeys({setWindowSize: {width: 1560, height: 960}})
})

test('navigation to url', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  await main._tabber.sendKeys({goto: 'https://www.google.com/'})
})

test('get window size', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  await main._tabber.get({windowSize: null})
})

test('_root check', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  await main.click({_root: null, header: {_root: null}})
})

test('parent element check', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  await main.get({apiItem: {attribute: 'href'}})
})

test('collection elements click', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  await main.click({navItems: {_action: null, _where: {text: 'API'}}})
  await main.click({navItems: {_action: null, _index: 1}})
  await main.click({navItems: {_action: null}})
})

test('collection elements hover', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  await main.hover({navItems: {_action: null, _where: {text: 'API'}}})
  await main.hover({navItems: {_action: null, _index: 1}})
  await main.hover({navItems: {_action: null}})
})

test('collection elements waitForDataState', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
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

test('collection elements waitForDisplayedState', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  const all = await main.waitForDisplayedState({navItems: {_state: true}})
  expect(all).toBeTruthy()
  const every = await main.waitForDisplayedState({navItems: {_state: true, _every: true}})
  expect(every).toBeTruthy()
  const some = await main.waitForDisplayedState({navItems: {_state: true, _some: true}})
  expect(some).toBeTruthy()
  const index = await main.waitForDisplayedState({navItems: {_state: true, _index: 4}})
  expect(index).toBeTruthy()
  const where = await main.waitForDisplayedState({navItems: {_state: true, _where: {text: 'API'}}})
  expect(where).toBeTruthy()
})

test('collection elements get', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
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

test('collection elements isDisplay', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  const {navItems} = await main.isDisplay({navItems: {_action: null, _index: 0}})

  expect(navItems).toBeTruthy()

  const {navItems: navItemsWhere} = await main.isDisplay({navItems: {_action: null, _where: {text: 'API'}}})

  expect(navItemsWhere).toBeTruthy()

  const {navItems: navItemsAll} = await main.isDisplay({navItems: {_action: null}})

  expect(navItemsAll.every((el) => el)).toBeTruthy()
})

test('collection elements isExist', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  const {navItems} = await main.isExist({navItems: {_action: null, _index: 0}})

  expect(navItems).toBeTruthy()

  const {navItems: navItemsWhere} = await main.isExist({navItems: {_action: null, _where: {text: 'API'}}})

  expect(navItemsWhere).toBeTruthy()

  const {navItems: navItemsAll} = await main.isExist({navItems: {_action: null}})

  expect(navItemsAll.every((el) => el)).toBeTruthy()
})

test('collection fragments click', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  await main.click({
    footer: {sections: {_where: {title: {text: 'Learn'}}, items: {_action: null, _where: {text: 'Learn Videos'}}}},
  })
})

test('collection fragments hover', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  await main.hover({footer: {sections: {_where: {title: {text: 'More'}}, items: {_action: null, _index: 0}}}})
})

test('collection fragments get', async ({pageProvider: {main}, data: {urls}}) => {
  const sections = [
    {items: [{text: 'Getting started'}, {text: 'Playwright Training'}, {text: 'Learn Videos'}, {text: 'Feature Videos'}]},
    {items: [{text: 'Stack Overflow'}, {text: 'Discord'}, {text: 'Twitter'}, {text: 'LinkedIn'}]},
    {items: [{text: 'GitHub'}, {text: 'YouTube'}, {text: 'Blog'}, {text: 'Ambassadors'}]},
  ]

  await main._tabber.sendKeys({goto: urls.playwright.home})
  const {
    footer: {sections: _sections},
  } = await main.get({
    footer: {sections: {items: {_action: {text: null}}}},
  })

  expect(_sections).toEqual(sections)
})

test('collection fragments isDisplay', async ({pageProvider: {main}, data: {urls}}) => {
  const sections = [
    {title: true, items: [true, true, true, true]},
    {title: true, items: [true, true, true, true]},
    {title: true, items: [true, true, true, true]},
  ]

  await main._tabber.sendKeys({goto: urls.playwright.home})
  const {
    footer: {sections: _sections},
  } = await main.isDisplay({
    footer: {sections: {title: null, items: {_action: null}}},
  })

  expect(_sections).toEqual(sections)
})

test('collection fragments isExist', async ({pageProvider: {main}, data: {urls}}) => {
  const sections = [
    {title: true, items: [true, true, true, true]},
    {title: true, items: [true, true, true, true]},
    {title: true, items: [true, true, true, true]},
  ]

  await main._tabber.sendKeys({goto: urls.playwright.home})
  const {
    footer: {sections: _sections},
  } = await main.isExist({
    footer: {sections: {title: null, items: {_action: null}}},
  })

  expect(_sections).toEqual(sections)
})

test('collection fragments waitForDataState', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  const result = await main.waitForDataState({
    footer: {
      sections: {
        _where: {title: {_where: {text: 'Learn'}}, items: {_where: {text: 'Learn Videos'}, _index: 2}},
        _some: true,
      },
    },
  })

  expect(result).toBeTruthy()
})

test('collection fragments waitForDisplayedState', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  const result = await main.waitForDisplayedState({
    footer: {
      sections: {_state: {title: true, items: {_every: true, _state: true}}, _every: true},
    },
  })

  expect(result).toBeTruthy()
})

test('collection fragments waitForDisplayedState where', async ({pageProvider: {main}, data: {urls}}) => {
  await main._tabber.sendKeys({goto: urls.playwright.home})
  const result = await main.waitForDisplayedState({
    footer: {
      sections: {_where: {title: {_where: {text: 'Learn'}}}, _state: {items: {_every: true, _state: true}}},
    },
  })

  expect(result).toBeTruthy()
})

import {test as base} from '@playwright/test'
import {urls} from './data/urls'
import {IMainPage, MainPage} from './po/main-page/main.page'
import {CheckboxPage, ICheckboxPage} from './po/checkbox-page/checkbox.page'
import {ISelectPage, SelectPage} from './po/select-page/select.page'
import {GithubPWPage, IGithubPWPage} from './po/github-pw-page/github.pw.page'

type MyFixtures = {
  pageProvider: PageProvider
  data: DataProvider
}

type DataProvider = {
  urls: typeof urls
}

type PageProvider = {
  main: IMainPage
  checkboxPage: ICheckboxPage
  selectPage: ISelectPage
  githubPWPage: IGithubPWPage
}

export const test = base.extend<MyFixtures>({
  pageProvider: async ({context, page}, use) => {
    await use({
      main: new MainPage(context, page),
      checkboxPage: new CheckboxPage(context, page),
      selectPage: new SelectPage(context, page),
      githubPWPage: new GithubPWPage(context, page),
    })
  },
  // eslint-disable-next-line no-empty-pattern
  data: async ({}, use) => {
    await use({
      urls,
    })
  },
})

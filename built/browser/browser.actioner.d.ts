import { Keys } from '../utils/keys';
import { type Page } from '@playwright/test';
type IActionerModifySendKeys = {
    keys: Keys | Keys[];
    options: {
        delay: number;
    };
};
declare class BrowserActioner {
    private name;
    protected page: () => Page;
    constructor(page: () => Page);
    protected getPage(): Page;
    sendKeys(keysObj: Keys | Keys[] | IActionerModifySendKeys): Promise<void>;
}
export { BrowserActioner, IActionerModifySendKeys };
//# sourceMappingURL=browser.actioner.d.ts.map
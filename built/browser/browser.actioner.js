"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserActioner = void 0;
class BrowserActioner {
    constructor(page) {
        this.name = 'Browser Actioner(s)';
        this.page = page;
    }
    getPage() {
        return this.page();
    }
    async sendKeys(keysObj) {
        const pressAction = async (keysData, options) => {
            const keysToPress = Array.isArray(keysData) ? keysData.join('+') : keysData;
            await this.page().keyboard.press(keysToPress, options);
        };
        if (typeof keysObj === 'string' || Array.isArray(keysObj)) {
            await pressAction(keysObj);
        }
        if (typeof keysObj === 'object' && !Array.isArray(keysObj)) {
            const { keys, options } = keysObj;
            await pressAction(keys, options);
        }
    }
}
exports.BrowserActioner = BrowserActioner;
//# sourceMappingURL=browser.actioner.js.map
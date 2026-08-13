"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserConsoler = void 0;
const evaluate_fn_1 = require("../utils/evaluate.fn");
function setConsoleData(sendObj) {
    const values = {
        clearState(state) {
            if (state) {
                localStorage.clear();
            }
        },
        hideScrollBarFrom(selector) {
            if (selector) {
                const style = document.createElement('style');
                style.innerHTML = `${selector}::-webkit-scrollbar {display: none;}`;
                document.head.appendChild(style);
            }
        },
        removeNode(selector) {
            const nodes = Array.isArray(selector) ? selector : [selector];
            for (const node of nodes) {
                document.querySelector(node).remove();
            }
        },
        setStyleForNode({ selector, styleName, value }) {
            const node = document.querySelector(selector);
            node ? (node['style'][styleName] = value) : null;
        },
        clearClipboard(state) {
            if (state) {
                navigator.clipboard.writeText('');
            }
        },
    };
    for (const key of Object.keys(sendObj)) {
        values[key](sendObj[key]);
    }
}
function getConsoleData({ getObj, getValues }) {
    const fn = new Function(`return ${getValues}`)();
    const values = {
        readyState() {
            return document.readyState;
        },
        cookiesLength() {
            return document.cookie.length;
        },
    };
    return fn(getObj, values);
}
class BrowserConsoler {
    constructor(page) {
        this.name = 'Browser console';
        this.page = page;
    }
    getPage() {
        return this.page();
    }
    async sendKeys(sendObj) {
        await this.page().evaluate(setConsoleData, sendObj);
    }
    async get(getObj) {
        return this.page().evaluate(getConsoleData, { getObj, getValues: evaluate_fn_1.getValues.toString() });
    }
}
exports.BrowserConsoler = BrowserConsoler;
//# sourceMappingURL=browser.consoler.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fixtures_1 = require("../fixtures");
var path_1 = __importDefault(require("path"));
var keys_1 = require("../lib/utils/keys");
(0, fixtures_1.test)('some test', function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var main = _b.pageProvider.main;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, main.goToPage()];
            case 1:
                _c.sent();
                return [4 /*yield*/, main.hover({ searchBtn: null })];
            case 2:
                _c.sent();
                return [4 /*yield*/, main.get({ searchBtn: { color: null } })];
            case 3:
                _c.sent();
                return [4 /*yield*/, main.scroll({ searchBtn: null })];
            case 4:
                _c.sent();
                return [4 /*yield*/, main.isExist({ searchBtn: null })];
            case 5:
                _c.sent();
                return [4 /*yield*/, main.isDisplay({ searchBtn: null })];
            case 6:
                _c.sent();
                return [4 /*yield*/, main.getScreenshot({ searchBtn: { filePath: path_1.default.resolve(process.cwd(), './screens/link.png') } })];
            case 7:
                _c.sent();
                return [4 /*yield*/, main.waitForDataState({ searchBtn: { expectedState: { attribute: { class: 'DocSearch' } }, includes: true } }, 5000)];
            case 8:
                _c.sent();
                return [4 /*yield*/, main.waitForDisplayedState({ searchBtn: true })];
            case 9:
                _c.sent();
                return [4 /*yield*/, main.click({ searchBtn: null })];
            case 10:
                _c.sent();
                return [4 /*yield*/, main.sendKeys({ searchInput: 'Locator' + keys_1.Keys.ENTER })];
            case 11:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, fixtures_1.test)('tabber, consoler', function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var _c = _b.pageProvider, main = _c.main, githubPWPage = _c.githubPWPage;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, main.goToPage()];
            case 1:
                _d.sent();
                return [4 /*yield*/, main.click({ github: null })];
            case 2:
                _d.sent();
                return [4 /*yield*/, githubPWPage._tabber.sendKeys({ switchTab: { url: 'https://github.com/microsoft/playwright' } })];
            case 3:
                _d.sent();
                return [4 /*yield*/, githubPWPage._tabber.waitForDataState({ expectedState: { url: 'https://github.com/microsoft/playwrig' }, includes: true })];
            case 4:
                _d.sent();
                return [4 /*yield*/, githubPWPage._tabber.sendKeys({ refresh: true })];
            case 5:
                _d.sent();
                return [4 /*yield*/, githubPWPage._consoler.get({ readyState: null })];
            case 6:
                _d.sent();
                return [4 /*yield*/, githubPWPage.click({ home: null })];
            case 7:
                _d.sent();
                return [4 /*yield*/, main._tabber.sendKeys({ switchTab: { defaultTab: true } })];
            case 8:
                _d.sent();
                return [4 /*yield*/, main.click({ github: null })];
            case 9:
                _d.sent();
                return [4 /*yield*/, githubPWPage._tabber.sendKeys({ switchTab: { index: 2 } })];
            case 10:
                _d.sent();
                return [4 /*yield*/, githubPWPage.click({ home: null })];
            case 11:
                _d.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, fixtures_1.test)('actioner', function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var main = _b.pageProvider.main;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, main.goToPage()];
            case 1:
                _c.sent();
                return [4 /*yield*/, main.click({ searchBtn: null })];
            case 2:
                _c.sent();
                return [4 /*yield*/, main._actioner.sendKeys([keys_1.Keys.A])];
            case 3:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, fixtures_1.test)('collection fragments', function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var main = _b.pageProvider.main;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, main.goToPage()];
            case 1:
                _c.sent();
                return [4 /*yield*/, main.get({ navigationBars: { by: { index: 0 }, navItem: { navItems: { action: { attribute: 'href' } } } } })];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, fixtures_1.test)('checkbox', function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var checkboxPage = _b.pageProvider.checkboxPage;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, checkboxPage.goToPage()];
            case 1:
                _c.sent();
                return [4 /*yield*/, checkboxPage.sendKeys({ checkbox: true })];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, fixtures_1.test)('select', function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var selectPage = _b.pageProvider.selectPage;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, selectPage.goToPage()];
            case 1:
                _c.sent();
                return [4 /*yield*/, selectPage.sendKeys({ select: { label: 'b' } })];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, fixtures_1.test)('new tab test', function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var main = _b.pageProvider.main;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, main.goToPage()];
            case 1:
                _c.sent();
                return [4 /*yield*/, main._tabber.sendKeys({ newTab: 'https://www.google.com/' })];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, fixtures_1.test)('set window size', function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var main = _b.pageProvider.main;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, main.goToPage()];
            case 1:
                _c.sent();
                return [4 /*yield*/, main._tabber.sendKeys({ setWindowSize: { width: 1560, height: 960 } })];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, fixtures_1.test)('navigation to url', function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var main = _b.pageProvider.main;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, main.goToPage()];
            case 1:
                _c.sent();
                return [4 /*yield*/, main._tabber.sendKeys({ navigateToUrl: 'https://www.google.com/' })];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, fixtures_1.test)('get window size', function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var main = _b.pageProvider.main;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, main.goToPage()];
            case 1:
                _c.sent();
                return [4 /*yield*/, main._tabber.get({ windowSize: null })];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, fixtures_1.test)('_root check', function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var main = _b.pageProvider.main;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, main.goToPage()];
            case 1:
                _c.sent();
                return [4 /*yield*/, main.click({ _root: null, header: { _root: null } })];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, fixtures_1.test)('parent element check', function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var main = _b.pageProvider.main;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, main.goToPage()];
            case 1:
                _c.sent();
                return [4 /*yield*/, main.get({ navbar: { attribute: 'class' } })];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });

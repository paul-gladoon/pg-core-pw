"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectPerformVerbs = collectPerformVerbs;
exports.hasPerformVerb = hasPerformVerb;
exports.performWithOptions = performWithOptions;
const helpers_1 = require("./helpers");
function collectPerformVerbs(data, verbs = new Set()) {
    if (typeof data === 'string') {
        verbs.add(data);
    }
    else if ((0, helpers_1.isPlainObject)(data)) {
        if (typeof data['_action'] === 'string') {
            verbs.add(data['_action']);
        }
        else {
            for (const key of Object.keys(data)) {
                if (key === '_where' || key === '_index')
                    continue;
                collectPerformVerbs(data[key], verbs);
            }
        }
    }
    return verbs;
}
function hasPerformVerb(performObj, verb) {
    return collectPerformVerbs(performObj).has(verb);
}
function performWithOptions(optionsByVerb) {
    return async function perform(action) {
        const verb = typeof action === 'string' ? action : action?._action;
        const extra = verb ? optionsByVerb[verb] : undefined;
        if (!extra) {
            return this.performInitial(action);
        }
        const provided = typeof action === 'string' ? {} : action;
        return this.performInitial({ ...provided, ...extra, _action: verb });
    };
}
//# sourceMappingURL=perform.js.map
import {isPlainObject} from './helpers'
import type {PerformVerb, BaseElementPerform, IClickOptions, IHoverOptions, IScrollOptions} from '../base.element'

function collectPerformVerbs(data: unknown, verbs = new Set<string>()): Set<string> {
  if (typeof data === 'string') {
    verbs.add(data)
  } else if (isPlainObject(data)) {
    if (typeof data['_action'] === 'string') {
      verbs.add(data['_action'])
    } else {
      for (const key of Object.keys(data)) {
        if (key === '_where' || key === '_index') continue
        collectPerformVerbs(data[key], verbs)
      }
    }
  }

  return verbs
}

function hasPerformVerb(performObj: unknown, verb: PerformVerb): boolean {
  return collectPerformVerbs(performObj).has(verb)
}

interface IPerformOptionsByVerb {
  click?: IClickOptions
  hover?: IHoverOptions
  scroll?: IScrollOptions
}

function performWithOptions(optionsByVerb: IPerformOptionsByVerb) {
  return async function perform(action: BaseElementPerform): Promise<void> {
    const verb = typeof action === 'string' ? action : action?._action
    const extra = verb ? optionsByVerb[verb] : undefined
    if (!extra) {
      return this.performInitial(action)
    }
    const provided = typeof action === 'string' ? {} : action
    return this.performInitial({...provided, ...extra, _action: verb})
  }
}

export {collectPerformVerbs, hasPerformVerb, performWithOptions}
export type {IPerformOptionsByVerb}

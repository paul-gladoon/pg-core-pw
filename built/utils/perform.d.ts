import type { PerformVerb, BaseElementPerform, IClickOptions, IHoverOptions, IScrollOptions } from '../base.element';
declare function collectPerformVerbs(data: unknown, verbs?: Set<string>): Set<string>;
declare function hasPerformVerb(performObj: unknown, verb: PerformVerb): boolean;
interface IPerformOptionsByVerb {
    click?: IClickOptions;
    hover?: IHoverOptions;
    scroll?: IScrollOptions;
}
declare function performWithOptions(optionsByVerb: IPerformOptionsByVerb): (action: BaseElementPerform) => Promise<void>;
export { collectPerformVerbs, hasPerformVerb, performWithOptions };
export type { IPerformOptionsByVerb };
//# sourceMappingURL=perform.d.ts.map
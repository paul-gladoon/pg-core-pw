import { type Locator } from '@playwright/test';
interface IWaitFor {
    state?: 'attached' | 'detached' | 'visible' | 'hidden';
    timeout?: number;
}
interface IWaitForState {
    timeout?: number;
    dontThrow?: boolean;
    interval?: number;
    message?: string;
}
declare const waiter: {
    waitFor: (element: Locator, name: string, options?: IWaitFor) => Promise<void>;
    waitForState: (callback: any, options?: IWaitForState) => Promise<any>;
};
export { waiter, IWaitForState };
//# sourceMappingURL=waiter.d.ts.map
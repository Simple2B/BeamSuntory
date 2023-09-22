type DispatcherCallback = (target: HTMLElement) => void;
export default class HTMXDispatcher {
    onloadCallbacks: {
        [name: string]: DispatcherCallback;
    };
    constructor();
    onLoad(targetId: string, callback: DispatcherCallback): void;
}
export {};

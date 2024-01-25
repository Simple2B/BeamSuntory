type DispatcherCallback = (target: HTMLElement) => void;

export default class HTMXDispatcher {
  onloadCallbacks: { [name: string]: DispatcherCallback };

  constructor() {
    this.onloadCallbacks = {};
    document.addEventListener('htmx:load', (evt) => {
      const target = evt.target as HTMLDivElement;
      const targetId = target.getAttribute('id');

      if (this.onloadCallbacks.hasOwnProperty(targetId)) {
        const callback = this.onloadCallbacks[targetId];
        callback(target);
      }
    });
  }

  onLoad(targetId: string, callback: DispatcherCallback) {
    this.onloadCallbacks[targetId] = callback;
  }
}

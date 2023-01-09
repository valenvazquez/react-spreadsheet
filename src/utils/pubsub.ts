export type TCallback = () => void;

export class PubSub {
  private events: Record<string, TCallback[]>;
  constructor() {
    this.events = {};
  }

  on(event: string, callback: TCallback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return () => {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    };
  }

  fire(event: string) {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach((cb) => cb());
  }
}

export class Buffer {
  value: string[];
  constructor() {
    this.value = [];
  }
  empty() {
    this.value.splice(0, this.value.length);
  }

  add(newValue: string) {
    this.value.push(newValue);
  }

  join() {
    return this.value.join("");
  }

  get length() {
    return this.value.length;
  }
}

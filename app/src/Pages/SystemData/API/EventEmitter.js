class EventEmitter {
  constructor() {
    this.stateCallbacks = {};
  }

  subscribe(state, callback) {
    if (this.stateCallbacks[state] === undefined) {
      this.stateCallbacks[state] = [];
    }
    this.stateCallbacks[state].push(callback);
  }

  update(state, value) {
    if (this.stateCallbacks[state] !== undefined) {
      this.stateCallbacks[state].forEach((callback, index) => {
        callback(value);
      });
    }
  }
}

export default new EventEmitter();

class ActionExample {
  constructor(origin) {
    this.origin = origin;
  }

  trigger() {
    console.log("action example has been triggered");
    this.origin.triggered = true;
  }
}
class Endscreen {
  constructor() {
    this.credits = new SingleImage(vec2(2000,2000), vec2(16, 8), 14, images["endScreen"]);
  }

  render() {
    this.credits.render();
  }

  renderPost() {
  }

  update() {
    if (mouseIsDown(0)) {
      display.loaded = new Menu();
    }
  }
}
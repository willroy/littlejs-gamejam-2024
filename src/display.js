class Display {
  constructor(height, width, scale) {
    this.height = height;
    this.width = width;
    this.scale = scale;

    cameraPos = vec2(this.height,this.width);
    cameraScale = this.scale;

    this.loaded = new World(0);
    this.loadedUI = null;

  }

  quitUI() {
    this.loadedUI = null;
    this.loaded.frozen = false;
  }

  render() {
    // world
    this.loaded.render();
  }

  renderPost() {
    // loaded UI
    if ( this.loadedUI ) this.loadedUI.render();

    this.loaded.renderPost();

    // overlay
    drawRect(vec2(0, 32), vec2(100, 34), rgb(0.212, 0.325, 0.412));
    drawRect(vec2(-16, 0), vec2(44, 100), rgb(0.212, 0.325, 0.412));
    drawRect(vec2(32, 0), vec2(12, 100), rgb(0.212, 0.325, 0.412));
    drawRect(vec2(0, -32), vec2(100, 66), rgb(0.212, 0.325, 0.412));
  }

  update() {
    if ( this.loadedUI ) this.loadedUI.update();
    this.loaded.update();
  }
} 

class Display {
  constructor(height, width, scale) {
    this.height = height;
    this.width = width;
    this.scale = scale;

    cameraPos = vec2(this.height,this.width);
    cameraScale = this.scale;

    this.loaded = new World(2);

    this.exampleImage = new SingleImage(735, 908, 30, 3, 4, 0)
    this.exampleAnimation = new Animation(10, 10, 70, 70, 735, 908, 32, 11, 4, 0)
  }

  render() {
    // background
    drawRect(vec2(16, 8), vec2(20, 14), hsl(0, 0, .9), 0, 0);

    // world
    this.loaded.render();
    
    // overlay
    drawRect(vec2(0, 32), vec2(100, 34), rgb(0.212, 0.325, 0.412));
    drawRect(vec2(-16, 0), vec2(44, 100), rgb(0.212, 0.325, 0.412));
    drawRect(vec2(32, 0), vec2(12, 100), rgb(0.212, 0.325, 0.412));
    drawRect(vec2(0, -32), vec2(100, 66), rgb(0.212, 0.325, 0.412));

    // ui text and images
    drawTextScreen('littlejs game', vec2(mainCanvasSize.x/2, 70), 40, hsl(1, 1, 1), 5, hsl(0, 0, 0));
    // this.exampleImage.render();
    // this.exampleAnimation.render();
  }

  update() {
    this.loaded.update();
    this.exampleAnimation.update();
  }
} 
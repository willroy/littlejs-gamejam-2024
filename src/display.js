class Display {
  constructor(height, width, scale) {
    this.height = height;
    this.width = width;
    this.scale = scale;

    cameraPos = vec2(this.height,this.width);
    cameraScale = this.scale;

    this.loaded = new World(1);

    this.exampleImage = new SingleImage(735, 908, 17, 9, 4, 0)
    this.exampleAnimation = new Animation(10, 10, 70, 70, 735, 908, 22, 11, 4, 0)
  }

  render() {
    drawRect(vec2(0, 0), vec2(mainCanvasSize.x,mainCanvasSize.y), rgb(0.212, 0.325, 0.412), 0, 0);
    drawRect(vec2(16, 8), vec2(20, 14), hsl(0, 0, .9), 0, 0);

    drawTextScreen('littlejs template', vec2(mainCanvasSize.x/2, 70), 40, hsl(1, 1, 1), 5, hsl(0, 0, 0));

    this.loaded.render();

    this.exampleImage.render();
    this.exampleAnimation.render();
  }

  update() {
    this.loaded.update();

    this.exampleAnimation.update();
  }
} 
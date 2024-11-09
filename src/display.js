class Display {
  constructor(height, width, scale) {
    this.height = height;
    this.width = width;
    this.scale = scale;
    this.exampleImage = new Image(0, 0, 735, 908, 17, 9, 4, 0)

    cameraPos = vec2(this.height,this.width);
    cameraScale = this.scale;
  }

  render() {
    // background
    drawRect(vec2(0, 0), vec2(mainCanvasSize.x,mainCanvasSize.y), rgb(0.212, 0.325, 0.412), 0, 0);
    drawRect(vec2(16, 8), vec2(20, 14), hsl(0, 0, .9), 0, 0);

    // text
    drawTextScreen('littlejs template', vec2(mainCanvasSize.x/2, 70), 40, hsl(1, 1, 1), 5, hsl(0, 0, 0));

    // example image 
    this.exampleImage.render();
  }
}
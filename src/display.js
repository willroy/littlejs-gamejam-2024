class Display {
  constructor(height, width, scale) {
    this.height = height;
    this.width = width;
    this.scale = scale;

    cameraPos = vec2(this.height,this.width);
    cameraScale = this.scale;
  }

  render() {
    // background
    drawRect(vec2(16,8), vec2(20,14), hsl(0,0,.6), 0, 0);

    // text
    drawTextScreen('littlejs template', vec2(mainCanvasSize.x/2, 70), 40, hsl(0,0,1), 6, hsl(0,0,0));
  }
}
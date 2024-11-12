class Entity extends EngineObject {
  constructor(x, y, world) {
    super()
    this.pos = vec2(x, y)
    this.size = vec2(1, 1)
    this.world = world
  }

  render() {
    super.render();

    drawRect(this.pos, this.size, hsl(0, 0, .2), 0, 0);
  }

  update() {
    super.update();
  }
}
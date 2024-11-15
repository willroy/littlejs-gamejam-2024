class Entity extends EngineObject {
  constructor(pos, size, rgba, world) {
    super()
    this.originalPos = pos
    this.size = size
    this.rgba = rgba
    this.world = world
    this.pos = vec2(this.originalPos.x+this.world.pos.x, this.originalPos.y+this.world.pos.y)
  }

  render() {
    this.pos = vec2(this.originalPos.x+this.world.pos.x, this.originalPos.y+this.world.pos.y)
    drawRect(this.pos, this.size, this.rgba, 0, 0);
  }

  update() {
    super.update();
  }
}
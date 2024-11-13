class Entity extends EngineObject {
  constructor(pos, size, rgba, world) {
    super()
    this.pos = pos
    this.size = size
    this.rgba = rgba
    this.world = world
  }

  render() {
    drawRect(this.pos, this.size, this.rgba, 0, 0);
  }

  update() {
  }
}
class Entity extends EngineObject {
  constructor(name, pos, size, rgba, world) {
    super()
    this.name = name;
    this.originalPos = pos;
    this.size = size;
    this.rgba = rgba;
    this.world = world;
    this.pos = vec2(this.originalPos.x+this.world.pos.x, this.originalPos.y+this.world.pos.y);
  }

  render() {
    this.pos = vec2(this.originalPos.x+this.world.pos.x, this.originalPos.y+this.world.pos.y);
    
    if (debug && debugOverlay) drawRect(this.pos, this.size, this.rgba, 0);
  }

  update() {
    super.update();
  }
}

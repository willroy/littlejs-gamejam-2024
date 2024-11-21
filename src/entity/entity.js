class Entity extends EngineObject {
  constructor(zindex, handle, pos, size, rgba, world) {
    super()
    this.zindex = zindex;
    this.handle = handle;
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

  toString()
  {
      if (debug)
      {
          var text = super.toString()
          text += "\nWorld Position: " + this.originalPos

          return text;
      }
  }
}

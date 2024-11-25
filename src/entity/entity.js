class Entity extends EngineObject {
  constructor(zindex, handle, pos, size, rgba, world, image) {
    super()
    this.zindex = zindex;
    this.handle = handle;
    this.originalPos = pos;
    this.size = size;
    this.rgba = rgba;
    this.world = world;
    this.pos = vec2(this.originalPos.x+this.world.pos.x, this.originalPos.y+this.world.pos.y);
    this.image = image;
    if ( this.image ) {
      this.image = new SingleImage(vec2(this.image[1], this.image[2]), this.pos, this.image[3], this.image[0]);
    }
  }

  render() {
    this.pos = vec2(this.originalPos.x+this.world.pos.x, this.originalPos.y+this.world.pos.y);

    if (debug && debugOverlay) drawRect(this.pos, this.size, this.rgba, 0);

    if ( this.image ) {
      this.image.pos = vec2(this.originalPos.x+this.world.pos.x, this.originalPos.y+this.world.pos.y);
      this.image.render();
    }
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

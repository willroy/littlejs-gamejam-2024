class Entity extends EngineObject {
  constructor(pos, size, rgba, world, image=null) {
    super()
    this.pos = pos
    this.size = size
    this.rgba = rgba
    this.world = world
    this.image = image
  }

  render() {
    if ( this.image != null ) {
      this.image.render();
    } else {
      drawRect(this.pos, this.size, this.rgba, 0, 0);
    }
  }

  update() {
  }
}
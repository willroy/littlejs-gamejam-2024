class DialogEntity extends Entity {
  constructor(lines, triggerEntity, world) {
    super(triggerEntity.pos, triggerEntity.size, triggerEntity.rgba, world);
    this.triggerEntity = triggerEntity
    this.lines = lines
    this.line = -1
    this.eDown = false
  }

  render() {
    super.render();
    console.log("Line: "+this.line)
    if (this.eDown && !keyIsDown("KeyE")){
      this.eDown = false
      console.log("E released")
      if (this.line < this.lines.length) {
        this.world.frozen = true;
        this.line++;
      }
      if (this.line == this.lines.length) {
        this.world.entities = this.world.entities.filter((ent) => ent != this)
        this.destroy()
        this.triggerEntity.triggered = false
        this.world.frozen = false;
      }
    }
    if (keyIsDown("KeyE")) this.eDown = true

    if (!this.eDown && 0 <= this.line && this.line < this.lines.length) drawText(this.lines[this.line], this.pos, this.size, (0, 1, 0, 1), 0.5, this.rgba);
  }

  update() {
    super.update();
  }
}
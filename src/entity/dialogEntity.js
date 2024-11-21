class DialogEntity extends Entity {
  constructor(dialogData, triggerEntity, world) {
    var colour = rgb().setHex(dialogData.colour)
    super(0, "", triggerEntity.pos, triggerEntity.size, colour, world);
    this.triggerEntity = triggerEntity;
    this.lines = dialogData.dialog;
    this.line = -1;
    this.eDown = false;
    this.fontSize = 0.5;
  }

  render() {
    if (this.eDown && !keyIsDown("KeyE")) {
      this.eDown = false;

      if (this.line < this.lines.length) {
        this.world.frozen = true;
        this.line++;
      }

      if (this.line == this.lines.length) {
        this.world.entities = this.world.entities.filter((ent) => ent != this);
        this.destroy();
        this.triggerEntity.triggered = false;
        this.world.frozen = false;
      }
    }

    if (keyIsDown("KeyE")) this.eDown = true;

    if (!this.eDown && 0 <= this.line && this.line < this.lines.length) {
      var textPos = this.triggerEntity.pos.add(vec2(0.0, 0.5))
      drawText(this.lines[this.line], textPos, this.fontSize, (0, 1, 0, 1), 0.5, this.rgba);
    }
  }

  update() {
    super.update();
  }
}

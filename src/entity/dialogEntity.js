class DialogEntity extends Entity {
  constructor(dialogData, triggerEntity, world) {
    var colour = rgb().setHex(dialogData.colour)
    super(0, "", triggerEntity.pos, triggerEntity.size, colour, world);
    this.triggerEntity = triggerEntity;
    this.lines = dialogData.dialog;
    this.line = -1;
    this.eDown = false;
    if ( this.triggerEntity.actionTrigger == "collide" ) this.eDown = true;
    this.fontSize = 0.5;
    this.selfDestruct = false;
    this.unTriggerOnFinish = false;
    this.finishAction = world.actions[dialogData.finishAction];
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

        if ( this.selfDestruct ) {
          this.world.entities = this.world.entities.filter((ent) => ent != this.triggerEntity);
          this.triggerEntity.destroy();
        }

        if ( this.finishAction ) new this.finishAction(this.triggerEntity).trigger();
        if ( this.unTriggerOnFinish && !keyIsDown("KeyE") ) this.triggerEntity.triggered = false;

        return;
      }
    }

    if (keyIsDown("KeyE")) this.eDown = true;

    if (!this.eDown && 0 <= this.line && this.line < this.lines.length) {
      var textPos = this.triggerEntity.pos.add(vec2(0, 1));
      var textWidth = ( ( 8 * this.fontSize ) * this.lines[this.line].length ) / 16;
      var textHeight = ( ( 8 * this.fontSize ) ) / 16;

      var boxPos = this.triggerEntity.pos.add(vec2(0, 1.05));
      var boxPadding = vec2(0.4, 0.6);

      drawRect(boxPos, vec2(textWidth, textHeight).add(boxPadding), this.rgba);
      drawText(this.lines[this.line], textPos, this.fontSize, (0, 1, 0, 1), 0.1, this.rgba);
    }
  }

  update() {
    super.update();
  }
}

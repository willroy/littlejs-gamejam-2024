class ControlsUI {
  constructor(triggerEntity) {
    this.triggerEntity = triggerEntity;
    this.world = triggerEntity.world;
    this.player = this.world.getEntityByHandle(this.world.player);

    this.image = new SingleImage(vec2(1358,945), this.player.pos, 8, images["controls"]);
  }

  render() {
    this.image.render();
  }

  update() {
    if (mouseWasPressed(0)) {
      display.quitUI();
      this.triggerEntity.triggered = false;
      this.world.frozen = false;
      var dialogAction = new DialogAction(this.triggerEntity);
      this.triggerEntity.destroy();
      dialogAction.trigger();
      return;
    }
  }
}

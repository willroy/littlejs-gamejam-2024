class ControlsUI extends EngineObject {
  constructor(triggerEntity) {
    super()
    this.triggerEntity = triggerEntity;
    this.world = triggerEntity.world;
    this.player = this.world.getEntityByHandle(this.world.player);

    this.image = new SingleImage(vec2(1358,945), this.player.pos, 8, images["controls"]);
  }

  render() {
    this.image.render();
  }

  update() {
    if (keyWasReleased("Escape")) {
      display.quitUI();
      this.triggerEntity.triggered = false;
      this.destroy();
      return;
    }
  }
}

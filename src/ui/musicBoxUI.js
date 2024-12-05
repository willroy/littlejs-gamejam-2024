class MusicBoxUI extends EngineObject {
  constructor(triggerEntity) {
    super()
    this.triggerEntity = triggerEntity;
    this.world = triggerEntity.world;
    this.player = this.world.getEntityByHandle(this.world.player);

    this.musicBoxClosed = new SingleImage(vec2(500,500), this.player.pos, 10, images["musicboxClosed"]);
    this.musicBoxOpen = new SingleImage(vec2(500,500), this.player.pos, 10, images["musicboxOpen"]);
    this.musicBoxOpenWTool = new SingleImage(vec2(500,500), this.player.pos, 10, images["musicboxOpenWTool"]);

    this.image = this.musicBoxClosed;
  }

  render() {
    this.image.render();
  }

  update() {
    if (keyWasReleased("Escape")) {
      display.loadedUI = this.world;
      this.triggerEntity.triggered = false;
      this.world.frozen = false;
      this.destroy();
      return;
    }

  }
}

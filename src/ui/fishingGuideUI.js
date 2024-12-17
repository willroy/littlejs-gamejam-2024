class FishingGuideUI {
  constructor(triggerEntity) {
    this.triggerEntity = triggerEntity;
    this.world = triggerEntity.world;
    this.player = this.world.getEntityByHandle(this.world.player);

    this.image = new SingleImage(vec2(1556,1007), this.player.pos, 10, images["fishingGuide"]);
  }

  render() {
    this.image.render();
  }

  update() {
    if (this.world.checkQuitKeys()) {
      display.quitUI();
      this.triggerEntity.triggered = false;
      this.world.frozen = false;
      this.player.fishingRodEnabled = true;
      return;
    }
  }
}

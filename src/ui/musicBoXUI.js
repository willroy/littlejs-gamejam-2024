class MusicBoxUI extends EngineObject {
  constructor(triggerEntity) {
    super()
    this.triggerEntity = triggerEntity;
    this.world = triggerEntity.world;
    this.player = this.world.getEntityByHandle(this.world.player);

    this.toolboxClosed = new SingleImage(vec2(500,500), this.player.pos, 10, images["toolboxClosed"]);
    this.toolboxOpen = new SingleImage(vec2(500,500), this.player.pos, 10, images["toolboxOpen"]);
    this.toolboxOpenWTool = new SingleImage(vec2(500,500), this.player.pos, 10, images["toolboxOpenWTool"]);

    this.image = this.toolboxClosed;
  }

  render() {
    this.image.render();
  }

  update() {
    
  }
}

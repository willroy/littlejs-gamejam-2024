class EndScreenAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
      this.world = this.triggerEntity.world;
    }

    trigger() {
      engineObjects = [];
      for (var i = 0; i < this.world.entities.length; i++) { this.world.destroyByHandle(this.world.entities[i].handle) }
      display.loaded = new Endscreen();
    }
}
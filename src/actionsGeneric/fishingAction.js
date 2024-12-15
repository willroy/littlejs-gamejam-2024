class FishingAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
      this.world = this.triggerEntity.world;
      this.player = this.world.getEntityByHandle(this.world.player);
    }

    trigger() {
        this.player.fishingRod
    }
}
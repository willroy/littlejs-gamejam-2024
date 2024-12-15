class FishingAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
    }

    trigger() {
        display.loadedUI = new FishingMinigameUI(this.triggerEntity);
        this.triggerEntity.world.frozen = true;
        this.triggerEntity.triggered = true;
    }
}
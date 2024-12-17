class FishingGuideAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
    }

    trigger() {
        display.loadedUI = new FishingGuideUI(this.triggerEntity);
        this.triggerEntity.world.frozen = true;
        this.triggerEntity.triggered = true;
    }
}
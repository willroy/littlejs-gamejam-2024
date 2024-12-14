class IntroAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
    }

    trigger() {
        display.loadedUI = new ControlsUI(this.triggerEntity);
        this.triggerEntity.world.frozen = true;
        this.triggerEntity.triggered = true;
    }
}
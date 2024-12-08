class MusicBoxAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
    }

    trigger() {
        this.triggerEntity.triggered = true;
        this.triggerEntity.world.frozen = true;
        display.loadedUI = new MusicBoxUI(this.triggerEntity);
    }
}


class MusicBoxAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
    }

    trigger() {
       console.log("Bwahahaahahaha!!!")
        this.triggerEntity.triggered = true;
        this.triggerEntity.world.frozen = true;
        display.loadedUI = new MusicBoxUI(this.triggerEntity);
    }
}


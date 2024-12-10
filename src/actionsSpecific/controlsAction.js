class ControlsAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
    }

    trigger() {
        display.loadedUI = new ControlsUI(this.triggerEntity);
        // display.quitUI();
    }
}
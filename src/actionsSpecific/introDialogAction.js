class IntroDialogAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
    }

    trigger() {
        var dialogAction = new DialogAction(this.triggerEntity);
        this.triggerEntity.destroy();
        dialogAction.trigger();
    }
}
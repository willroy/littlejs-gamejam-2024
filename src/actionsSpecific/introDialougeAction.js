class IntroDialougeAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
    }

    trigger() {
        var dialogAction = new DialogAction(this.triggerEntity);
        dialogAction.triggerEntitySelfDestruct = true;
        dialogAction.trigger();
    }
}
class BeaverDialougeAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
    }

    trigger() {
        var dialogAction = new DialogAction(this.triggerEntity);
        dialogAction.dialogHandle = "beaver-dialouge-beforewood";
        dialogAction.trigger();
    }
}
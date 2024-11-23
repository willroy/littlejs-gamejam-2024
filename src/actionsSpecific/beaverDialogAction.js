class BeaverDialogAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
    }

    trigger() {
        var dialogAction = new DialogAction(this.triggerEntity);
        dialogAction.dialogHandle = "beaver-dialog-beforewood";
        dialogAction.trigger();
    }
}
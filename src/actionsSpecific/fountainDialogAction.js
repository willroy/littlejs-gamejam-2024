class FountainDialogAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
    }

    trigger() {
        var dialogAction = new DialogAction(this.triggerEntity);
        dialogAction.dialogHandle = "fountain-dialog-empty";
        dialogAction.trigger();
    }
}
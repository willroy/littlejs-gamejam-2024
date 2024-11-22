class FountainDialougeAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
    }

    trigger() {
        var dialogAction = new DialogAction(this.triggerEntity);
        dialogAction.dialogHandle = "fountain-dialouge-empty";
        dialogAction.trigger();
    }
}
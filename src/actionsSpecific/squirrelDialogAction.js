class SquirrelDialogAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
      this.world = triggerEntity.world;
    }

    trigger() {
        var player = this.world.getEntityByHandle(this.world.player);
        var dialogAction = new DialogAction(this.triggerEntity);

        if ( gameVariables["musicBoxSolved"] ) {
          dialogAction.dialogHandle = "squirrel-dialog-solved"
        }

        dialogAction.trigger();
    }
}
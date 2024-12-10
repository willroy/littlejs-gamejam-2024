class BeaverDialogAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
      this.world = triggerEntity.world;
    }

    trigger() {
        var player = this.world.getEntityByHandle(this.world.player);
        var dialogAction = new DialogAction(this.triggerEntity);

        if ( player.inventory.includes("wood1") && player.inventory.includes("wood2") && player.inventory.includes("wood3") && player.inventory.includes("wood4") && player.inventory.includes("wood5") ) {
          var gateEntity = this.world.getEntityByHandle("bridgeDone");
          gateEntity.image = new SingleImage(vec2(967, 427), this.pos, 6.4, images["bridgeDone"]);
          dialogAction.dialogHandle = "beaver-dialog-afterwood";
        } else {
          dialogAction.dialogHandle = "beaver-dialog-beforewood";
        }

        dialogAction.trigger();
    }
}
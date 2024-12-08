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
          this.triggerEntity.destroy();
          this.world.getEntityByHandle("bridgeBlocker").destroy()
          player.inventory.splice(player.inventory.indexOf("wood1"), 1);
          player.inventory.splice(player.inventory.indexOf("wood2"), 1);
          player.inventory.splice(player.inventory.indexOf("wood3"), 1);
          player.inventory.splice(player.inventory.indexOf("wood4"), 1);
          player.inventory.splice(player.inventory.indexOf("wood5"), 1);
          return
        } 

        dialogAction.dialogHandle = "beaver-dialog-beforewood";
        dialogAction.trigger();
    }
}
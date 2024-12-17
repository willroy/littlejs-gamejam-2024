class CatDialogAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
      this.world = triggerEntity.world;
      this.player = this.world.getEntityByHandle(this.world.player);
    }

    trigger() {
      var player = this.world.getEntityByHandle(this.world.player);
      var dialogAction = new DialogAction(this.triggerEntity);
      if ( this.player.fishingRodEnabled ) {
        dialogAction.dialogHandle = "cat-dialog-haveRod";
      }
     if ( player.inventory.includes("fish1") && player.inventory.includes("fish2") && player.inventory.includes("fish3") && player.inventory.includes("fish4") && player.inventory.includes("fish5") ) {
        this.world.getEntityByHandle("mazeBlocker").destroy();
        this.world.getEntityByHandle("mazeBlockerImage").destroy();
        player.inventory.splice(player.inventory.indexOf("fish1"), 1);
        player.inventory.splice(player.inventory.indexOf("fish2"), 1);
        player.inventory.splice(player.inventory.indexOf("fish3"), 1);
        player.inventory.splice(player.inventory.indexOf("fish4"), 1);
        player.inventory.splice(player.inventory.indexOf("fish5"), 1);
        dialogAction.dialogHandle = "cat-dialog-haveFish";
      } 
      dialogAction.trigger();
    }
}
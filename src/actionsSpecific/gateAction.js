class GateAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
        this.world = triggerEntity.world;
    }

    trigger() {
        var player = this.world.getEntityByHandle(this.world.player);
        var dialogAction = new DialogAction(this.triggerEntity);

        if ( player.inventory.includes("gateKey") && player.inventory.indexOf("gateKey") == player.inventoryPos ) {
          var gateEntity = this.world.getEntityByHandle("gateOpen");
          gateEntity.image = new SingleImage(vec2(119, 287), this.pos, 4.3, images["gateOpen"]);
          this.triggerEntity.destroy();
          this.world.getEntityByHandle("gateBlocker").destroy()
          return
        } 
        else if ( player.inventory.includes("gateKey") ) {
          dialogAction.dialogHandle = "gate-locked-haveKey";
          dialogAction.unTriggerOnRelease = true;
          dialogAction.trigger();
          return
        } 

        dialogAction.dialogHandle = "gate-locked";
        dialogAction.trigger();
    }
}

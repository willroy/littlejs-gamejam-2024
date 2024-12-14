class GateAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
      this.world = triggerEntity.world;
    }

    trigger() {
        var player = this.world.getEntityByHandle(this.world.player);
        var dialogAction = new DialogAction(this.triggerEntity);

        if ( player.inventory.includes("gateKey") ) {
          var gateEntity = this.world.getEntityByHandle("gateOpen");
          gateEntity.image = new SingleImage(vec2(119, 287), this.pos, 4.3, images["gateOpen"]);
          this.triggerEntity.destroy();
          this.world.destroyByHandle("gateBlocker")
          return
        }

        dialogAction.dialogHandle = "gate-locked";
        dialogAction.trigger();
    }
}

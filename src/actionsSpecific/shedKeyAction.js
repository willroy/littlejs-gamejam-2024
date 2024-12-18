class ShedKeyAction {
  constructor(triggerEntity) {
    this.triggerEntity = triggerEntity;
    this.world = triggerEntity.world;
  }

  trigger() {
    var dialogAction = new DialogAction(this.triggerEntity);
    var player = this.world.getEntityByHandle(this.world.player);

    this.triggerEntity.triggered = true;
    if (gameVariables["shedEmpty"]){
      dialogAction.dialogHandle = "shed-empty";
      dialogAction.unTriggerOnRelease = true;
      dialogAction.trigger();
    }
    else if (gameVariables["shedKeyUsed"] || player.inventory.includes("shedkey") ) {
      this.triggerEntity.unTriggerOnRelease = true;
      this.triggerEntity.world.frozen = true;
      gameVariables["shedKeyUsed"] = true
      if (player.inventory.includes("shedkey")) player.inventory.splice(player.inventory.indexOf("shedkey"), 1);
      display.loadedUI = new ShedUI(this.triggerEntity);
    }
    else {
      dialogAction.dialogHandle = "shed-locked";
      dialogAction.unTriggerOnRelease = true;
      dialogAction.trigger();
    }
  }
}

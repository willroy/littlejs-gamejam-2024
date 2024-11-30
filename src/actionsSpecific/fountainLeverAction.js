class FountainLeverAction {
  constructor(triggerEntity) {
    this.triggerEntity = triggerEntity;
    this.world = triggerEntity.world;
  }

  trigger() {
    var dialogAction = new DialogAction(this.triggerEntity);
    var player = this.world.getEntityByHandle(this.world.player);

    if (gameVariables["leverPiecePlaced"]) {
      var leverEntity = this.world.getEntityByHandle("fountainLever");

      leverEntity.image = new SingleImage(vec2(84, 199), this.pos, 2, images["fountainLeverDown"]);
      this.world.entities = this.world.entities.filter((ent) => ent != this.triggerEntity);
      this.triggerEntity.destroy();
    }
    else if ( player.inventory.includes("leverpiece") && player.inventory.indexOf("leverpiece") == player.inventoryPos ) {
      dialogAction.dialogHandle = "fountainLever-brokenHoldingItem";
      gameVariables["leverPiecePlaced"] = true;
      var leverEntity = this.world.getEntityByHandle("fountainLever");
      leverEntity.image = new SingleImage(vec2(84, 199), this.pos, 2, images["fountainLeverUp"]);
    } 
    else if ( player.inventory.includes("leverpiece") ) {
      dialogAction.dialogHandle = "fountainLever-brokenHaveItem";
      dialogAction.trigger();
    } 
    else {
      dialogAction.dialogHandle = "fountainLever-broken";
      dialogAction.trigger();
    }
  }
}

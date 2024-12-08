class FountainLeverAction {
  constructor(triggerEntity) {
    this.triggerEntity = triggerEntity;
    this.world = triggerEntity.world;
  }

  trigger() {
    var dialogAction = new DialogAction(this.triggerEntity);
    var player = this.world.getEntityByHandle(this.world.player);

    this.triggerEntity.triggered = true;

    if (gameVariables["leverPiecePlaced"]) {
      var leverEntity = this.world.getEntityByHandle("fountainLever");
      leverEntity.image = new SingleImage(vec2(84, 199), this.pos, 3, images["fountainLeverDown"]);

      var fountainEntity = this.world.getEntityByHandle("fountain");
      fountainEntity.image = new SingleImage(vec2(210, 538), this.pos, 8, images["fountainFull"]);

      this.world.entities = this.world.entities.filter((ent) => ent != this.triggerEntity);
      this.triggerEntity.destroy();
      gameVariables["fountainFull"] = true;
    }
    else if ( player.inventory.includes("leverpiece") && player.inventory.indexOf("leverpiece") == player.inventoryPos ) {
      var leverEntity = this.world.getEntityByHandle("fountainLever");
      leverEntity.image = new SingleImage(vec2(84, 199), this.pos, 3, images["fountainLeverUp"]);
      this.triggerEntity.unTriggerOnRelease = true;
      gameVariables["leverPiecePlaced"] = true;
      player.inventory.splice(player.inventory.indexOf("leverpiece"), 1);
    } 
    else if ( player.inventory.includes("leverpiece") ) {
      dialogAction.dialogHandle = "fountainLever-brokenHaveItem";
      dialogAction.unTriggerOnRelease = true;
      dialogAction.trigger();
    } 
    else {
      dialogAction.dialogHandle = "fountainLever-broken";
      dialogAction.unTriggerOnRelease = true;
      dialogAction.trigger();
    }
  }
}

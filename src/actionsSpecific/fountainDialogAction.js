class FountainDialogAction {
  constructor(triggerEntity) {
    this.triggerEntity = triggerEntity;
    this.world = this.triggerEntity.world;
  }

  trigger() {
    if ( gameVariables["fountainFull"] ) {
      new ItemPickupAction(this.triggerEntity, "wood1").trigger();
      this.triggerEntity.destroy();

      var fountainEntity = this.world.getEntityByHandle("fountain");
      fountainEntity.image = new SingleImage(vec2(210, 538), this.pos, 8, images["fountainFullNoWood"]);

      return;
    }

    var dialogAction = new DialogAction(this.triggerEntity);
    dialogAction.dialogHandle = "fountain-dialog-empty";
    dialogAction.trigger();
  }
}
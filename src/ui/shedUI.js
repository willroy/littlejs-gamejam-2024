class ShedUI extends EngineObject {
  constructor(triggerEntity) {
    super()
    this.triggerEntity = triggerEntity;
    this.world = triggerEntity.world;
    this.player = this.world.getEntityByHandle(this.world.player);

    this.shelf = new SingleImage(vec2(2500,2000), this.player.pos, 18, images["shelf"]);
    this.shelfEmpty = new SingleImage(vec2(2500,2000), this.player.pos, 18, images["shelfEmpty"]);
    
    this.wood = vec2(16,2)
    this.woodSize = vec2(5.2,1)
  }

  render() {
    // Uncomment to show wood clickbox
    // drawRect(this.wood, this.woodSize, rgb(0,1,0,0.5));
    var image = gameVariables["shedEmpty"] ? this.shelfEmpty : this.shelf;
    image.render();
  }

  update() {
    if (keyWasReleased("Escape")) {
      display.quitUI();
      this.triggerEntity.triggered = false;
      this.destroy();
      return;
    }

    if (mouseWasPressed(0)) {
      this.mousePress = true;

      if ( !gameVariables["shedEmpty"] || gameVariables["shedEmpty"] == null ) {
        if ( isMouseIn(this.wood, this.woodSize) ) {
          gameVariables["shedEmpty"] = true;

          new ItemPickupAction(this.triggerEntity, "wood2").trigger();
          new ItemPickupAction(this.triggerEntity, "wood3").trigger();
        }
      }
    }
  }
}

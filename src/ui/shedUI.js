class ShedUI {
  constructor(triggerEntity) {
    this.triggerEntity = triggerEntity;
    this.world = triggerEntity.world;
    this.player = this.world.getEntityByHandle(this.world.player);

    this.shelf = new SingleImage(vec2(2500,2000), this.player.pos, 18, images["shelf"]);
    this.shelfEmpty = new SingleImage(vec2(2500,2000), this.player.pos, 18, images["shelfEmpty"]);
    
    this.wood = vec2(15.9,2.5)
    this.woodSize = vec2(5.5,1.3)
  }

  render() {
    // Uncomment to show wood clickbox
    var image = gameVariables["shedEmpty"] ? this.shelfEmpty : this.shelf;
    image.render();
    // drawRect(this.wood, this.woodSize, rgb(0,1,0,0.5));
  }

  update() {
    if (this.world.checkQuitKeys()) {
      display.quitUI();
      this.triggerEntity.triggered = false;
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

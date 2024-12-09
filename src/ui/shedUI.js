class ShedUI extends EngineObject {
  constructor(triggerEntity) {
    super()
    this.triggerEntity = triggerEntity;
    this.world = triggerEntity.world;
    this.player = this.world.getEntityByHandle(this.world.player);

    this.shelf = new SingleImage(vec2(450,679), this.player.pos, 10, images["shelf"]);
    this.shelfEmpty = new SingleImage(vec2(450,679), this.player.pos, 10, images["shelfEmpty"]);
    
    this.wood = this.player.pos.add(vec2(0, -4.2))
    this.woodSize = vec2( 4.5, 1.0)
      
  }

  render() {
    var image = gameVariables["shedEmpty"] ? this.shelfEmpty : this.shelf;
    image.render();
  }

  update() {
    if (keyWasReleased("Escape")) {
      display.loadedUI = null;
      this.triggerEntity.triggered = false;
      this.world.frozen = false;
      this.destroy();
      return;
    }
    if (mouseWasPressed(0)) {
      this.mousePress = true;

      if ( !gameVariables["shedEmpty"] || gameVariables["shedEmpty"] == null ) {
        if ( isMouseIn(this.wood, this.woodSize) ) {
          this.image = this.shelfEmpty;
          gameVariables["shedEmpty"] = true;

          new ItemPickupAction(this.triggerEntity, "wood2").trigger();
          new ItemPickupAction(this.triggerEntity, "wood3").trigger();
        }
      }
    }
  }
}

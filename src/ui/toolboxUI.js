class ToolboxUI extends EngineObject {
  constructor(triggerEntity) {
    super()
    this.triggerEntity = triggerEntity;
    this.world = triggerEntity.world;
    this.player = this.world.getEntityByHandle(this.world.player);

    this.toolboxClosed = new SingleImage(vec2(500,500), this.player.pos, 10, images["toolboxClosed"]);
    this.toolboxOpen = new SingleImage(vec2(500,500), this.player.pos, 10, images["toolboxOpen"]);
    this.toolboxOpenWTool = new SingleImage(vec2(500,500), this.player.pos, 10, images["toolboxOpenWTool"]);

    this.image = this.toolboxClosed;

    this.combinationBoxes = [
      this.player.pos.add(vec2(-2.46, -1.05)),
      this.player.pos.add(vec2(-1.26, -1.05)),
      this.player.pos.add(vec2(-0.06, -1.05)),
      this.player.pos.add(vec2(1.14, -1.05)),
      this.player.pos.add(vec2(2.36, -1.05)),
    ]

    this.buttonSize = vec2(0.72,0.7);

    this.colours = [
      rgb(1,0,0,1),
      rgb(0,1,0,1),
      rgb(0,0,1,1),
      rgb(1,1,0,1),
      rgb(1,0,1,1),
      rgb(0,1,1,1)
    ]

    this.targetCombination = [5,2,1,3,4];
    this.combination = [0,0,0,0,0];
    this.mousePress = false;

    this.opened = false;
    this.tooltaken = false;
  }

  render() {
    this.image.render();

    if ( !this.opened ) {
      for (var i = 0; i < this.combination.length; i++) {
        drawRect(this.combinationBoxes[i], this.buttonSize,this.colours[this.combination[i]]);
      }
    }
  }

  update() {
    if (keyWasReleased("Escape")) {
      display.loadedUI = this.world;
      this.triggerEntity.triggered = false;
      this.world.frozen = false;
      this.destroy();
      return;
    }

    if (mouseWasPressed(0)) {
      this.mousePress = true;

      if ( this.opened && !this.tooltaken ) {
        var withinX = ( mousePos.x > 18 && mousePos.x < 20 )
        var withinY = ( mousePos.y > 6 && mousePos.y < 8 ) 
        if ( withinX && withinY ) {
          this.image = this.toolboxOpen;
          this.tooltaken = true;
          new ItemPickupAction(this.triggerEntity, "leverpiece").trigger();
        }
      }
    }

    if ( !this.opened ) {
      if ( this.mousePress && mouseWasReleased(0) ) {
        for ( var i = 0; i < this.combination.length; i++ ) {
          if ( isMouseIn( this.combinationBoxes[i], this.buttonSize ) ) {
            var currentColour = this.combination[i];
            this.combination[i] = (currentColour + 1) % this.colours.length;
          }
        }
        this.mousePress = false;
      }

      if (this.isCombinationCorrect()) {
        this.opened = true;
        this.image = this.toolboxOpenWTool;
      }
    }

  }
  
  isCombinationCorrect(){
    for (var i = 0; i < this.combination.length; i++) {
      if (this.combination[i] != this.targetCombination[i]) {
        return false;
      }
    }
    return true;
  }

}

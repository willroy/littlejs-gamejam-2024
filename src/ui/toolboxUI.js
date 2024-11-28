class ToolboxUI extends EngineObject {
  constructor(triggerEntity) {
    super()
    this.triggerEntity = triggerEntity;
    this.world = triggerEntity.world;
    this.player = this.world.getEntityByHandle(this.world.player);
    this.toolboxClosed = new SingleImage(vec2(500,500), this.player.pos, 10, 2);

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
  }

  render() {
    this.toolboxClosed.render();
    for (var i = 0; i < this.combination.length; i++) {
      drawRect(this.combinationBoxes[i], this.buttonSize,this.colours[this.combination[i]]);
    }
  }

  update() {
    if (keyWasReleased("KeyQ")) {
      display.loadedUI = this.world;
      this.triggerEntity.triggered = false;
      this.world.frozen = false;
      this.destroy();
      return;
    }

    if (mouseWasPressed(0)) {
      this.mousePress = true;
    }

    if (this.mousePress && mouseWasReleased(0)) {
      for (var i = 0; i < this.combination.length; i++) {
        if (this.isMouseIn(this.combinationBoxes[i], this.buttonSize)) {
          var currentColour = this.combination[i];
          this.combination[i] = (currentColour + 1) % this.colours.length;
          console.log("Combination: " + this.combination);
        }
      }
      this.mousePress = false;
    }

    if (this.isCombinationCorrect()) {
      console.log("Box Opened!!");
    }
  }
  
  isMouseIn(boxOrigin, boxSize){
    var minX = boxOrigin.x - boxSize.x / 2;
    var maxX = boxOrigin.x + boxSize.x / 2;
    var minY = boxOrigin.y - boxSize.y / 2;
    var maxY = boxOrigin.y + boxSize.y / 2;
    return mousePos.x > minX && mousePos.x < maxX &&  mousePos.y > minY && mousePos.y < maxY;
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

purple = rgb(0,1,0,1.0)


class MusicBoxUI extends EngineObject {
  constructor(triggerEntity) {
    super()
    this.triggerEntity = triggerEntity;
    this.world = triggerEntity.world;
    this.player = this.world.getEntityByHandle(this.world.player);
    this.opened = false;
    this.playing = false;

    this.musicBoxClosed = new SingleImage(vec2(500,500), this.player.pos, 10, images["musicboxClosed"]);
    this.musicBoxOpen = new SingleImage(vec2(500,500), this.player.pos, 10, images["musicboxOpen"]);
    this.musicBoxOpenWTool = new SingleImage(vec2(500,500), this.player.pos, 10, images["musicboxOpenWTool"]);

    this.image = this.musicBoxClosed;


    this.keys = [
      this.player.pos.add(vec2(-2.46, -1.05)),
      this.player.pos.add(vec2(-1.26, -1.05)),
      this.player.pos.add(vec2(-0.06, -2.05)),
      this.player.pos.add(vec2(1.14, -1.05)),
      this.player.pos.add(vec2(2.36, -1.05)),
    ]

    this.startButton = this.player.pos.add(vec2(-0.05, 0.46)),

    this.startButtonSize = vec2(0.6,0.6);
    this.counter = 0
  }

  render() {
    this.image.render();
    
    if (this.playing){
        drawRect(this.keys[0], this.buttonSize, purple);
        this.counter++
        console.log("Count: "+this.counter)
      if (this.counter >= 60){
        this.playing = false
        this.counter = 0
      }
    }
    // drawRect(this.startButton, this.startButtonSize, purple, 0.8)
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
    }

    if ( !this.opened && !this.playing) {
      if ( this.mousePress && mouseWasReleased(0) ) {
        if ( isMouseIn( this.startButton, this.startButtonSize ) ) {
          console.log("Play Tunes...")
          this.playing = true;
        }
        this.mousePress = false;
      }
    }
  }
}

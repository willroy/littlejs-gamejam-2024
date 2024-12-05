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
      this.player.pos.add(vec2(-1.86, -3.6)),
      this.player.pos.add(vec2(-1.26, -3.6)),
      this.player.pos.add(vec2(-0.65, -3.6)),
      this.player.pos.add(vec2(-0.05, -3.6)),
      this.player.pos.add(vec2(0.55, -3.6)),
      this.player.pos.add(vec2(1.15, -3.6)),
      this.player.pos.add(vec2(1.75, -3.6)),
    ]

    this.sequence = [0,3,1,6]

    this.startButton = this.player.pos.add(vec2(-0.05, 0.46)),

    this.startButtonSize = vec2(0.6,0.6);
    this.keySize = vec2(0.6,1.8);
    this.counter = 0
    this.key = 0
  }

  render() {
    this.image.render();
    
    if (this.playing){
      drawRect(this.keys[this.sequence[this.key]], this.keySize, purple);
      this.counter++
      if (this.counter >= 60){
        this.counter = 0
        this.key++
        console.log("Key: "+this.key)
        console.log("Seq: "+this.sequence[this.key])
      }
      if (this.key == this.sequence.length){
        this.key = 0
        console.log("Stopping tune")
        this.playing = false
      }
    }
    // drawRect(this.startButton, this.startButtonSize, purple, 0.8)
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

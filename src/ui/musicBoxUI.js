class MusicBoxUI {
  constructor(triggerEntity) {
    this.triggerEntity = triggerEntity;
    this.world = triggerEntity.world;
    this.player = this.world.getEntityByHandle(this.world.player);
    this.opened = false;
    this.playing = false;

    this.musicBoxClosed = new SingleImage(vec2(500,500), this.player.pos, 10, images["musicboxClosed"]);
    this.musicBoxOpen = new SingleImage(vec2(500,500), this.player.pos, 10, images["musicboxOpen"]);
    this.musicBoxOpenWTool = new SingleImage(vec2(500,500), this.player.pos, 10, images["musicboxOpenWKey"]);

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
    this.entered = []

    this.startButton = this.player.pos.add(vec2(-0.05, 0.46)),
    this.shedkey = vec2( 16.7, 6.7)
    this.shedkeySize = vec2( 1.8, 1.3)

    this.startButtonSize = vec2(0.6,0.6);
    this.keySize = vec2(0.6,1.8);
    this.counter = 0
    this.key = 0
    this.keyPressed = -1
    this.keytaken = false;

    this.purple = rgb(0,1,0,0.5)

    this.animationSteps = [
      [0,0],
      [500,0],
      [1000,0],
      [1500,0]
    ]

    this.animationIdle = false;
    this.animationCount = 0;
    this.animationStep = 0;
    this.animationSpeed = 20;

    var animationStepXY = vec2(this.animationSteps[this.animationStep][0], this.animationSteps[this.animationStep][1]);
    this.interactimage = new SpriteSheetImage(animationStepXY, vec2(500, 500), this.startButton, 1, images["interact"]);
  }

  render() {
    this.image.render();
    // Uncomment to show shedkey clickbox
    // drawRect(this.shedkey, this.shedkeySize, this.purple);
    
    if (this.playing) {
      drawRect(this.keys[this.sequence[this.key]], this.keySize, this.purple);
      this.counter++
      if (this.counter >= 60) {
        this.counter = 0
        this.key++
      }
      if (this.key == this.sequence.length) {
        this.key = 0
        this.playing = false
      }
    }
    else if(this.keyPressed >= 0) {
      drawRect(this.keys[this.keyPressed], this.keySize, this.purple);
      this.counter++
      if (this.counter >= 20) {
        this.counter = 0
        this.keyPressed = -1
      }
    }

    if ( this.interactimage ) {
      var pos = this.startButton;
      if ( this.opened ) pos = this.shedkey;
      this.interactimage.pos = pos;
      this.interactimage.color = rgb(1,1,1,0.9)
      this.interactimage.render();
    }
  }

  update() {
    if (this.world.checkQuitKeys()) {
      display.quitUI();
      this.triggerEntity.triggered = false;
      return;
    }

    if (mouseWasPressed(0)) {
      this.mousePress = true;

      if ( this.opened && !this.keytaken ) {
        if ( isMouseIn(this.shedkey, this.shedkeySize) ) {
          this.image = this.musicBoxOpen;
          this.keytaken = true;
          this.interactimage = null;
          new ItemPickupAction(this.triggerEntity, "shedkey").trigger();
          gameVariables["musicBoxSolved"] = true;
        }
      }
    }

    if ( !this.opened && !this.playing) {
      if ( this.mousePress && mouseWasReleased(0) ) {
        if ( isMouseIn( this.startButton, this.startButtonSize ) ) {
          this.playTunes()
        }
        for (var i=0; i < this.keys.length; i++) {
          if (isMouseIn(this.keys[i], this.keySize)) {
            this.pressKey(i)
          }
        }
        this.mousePress = false;
      }
    }

    if ( this.interactimage ) {
      this.updateInteractIndicator()
    }
  }

  playTunes() {
    this.playing = true;
  }

  pressKey(key) {
    this.keyPressed = key;
    // TODO: the sequence should get longer by 1 each time and succeed once the end has been reached
    if (key == this.sequence[this.entered.length]) {
      this.entered.push(key);
    }
    else {
      this.entered = [];
    }

    if (this.sequence.length == this.entered.length) {
      this.entered = [];
      this.opened = true;
      this.image = this.musicBoxOpenWTool;
    }
  }

  updateInteractIndicator() {
    if ( this.animationStep >= this.animationSteps.length ) { this.animationStep = 0 }
    this.animationCount = this.animationCount + 1;
    if ( this.animationCount >= this.animationSpeed ) {
      this.animationCount = 0;

      var animationStepXY = vec2(this.animationSteps[this.animationStep][0], this.animationSteps[this.animationStep][1]);
      var pos = this.startButton;
      if ( this.opened ) pos = this.shedkey;
      this.interactimage = new SpriteSheetImage(animationStepXY, vec2(500, 500), pos, 1, images["interact"]);
      this.animationStep = this.animationStep + 1;
    }
  }
}

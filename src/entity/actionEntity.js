class ActionEntity extends Entity {
  constructor(zindex, handle, pos, size, rgba, world, image, actionTrigger, action) {
    super(zindex, handle, pos, size, rgba, world, image);
    this.actionTrigger = actionTrigger;
    this.action = action;
    this.triggered = false;
    this.unTriggerOnRelease = false;

    this.animationSteps = [
      [0,0],
      [500,0],
      [1000,0],
      [1500,0]
    ]

    this.animationCount = 0;
    this.animationStep = 0;
    this.animationSpeed = 20;

    var animationStepXY = vec2(this.animationSteps[this.animationStep][0], this.animationSteps[this.animationStep][1]);
    this.interactimage = new SpriteSheetImage(animationStepXY, vec2(500, 500), this.pos, 1.5, images["interact"]);
  }

  render() {
    this.pos = vec2(this.originalPos.x+this.world.pos.x, this.originalPos.y+this.world.pos.y);

    if (debug && debugOverlay) drawRect(this.pos, this.size, this.rgba, 0);

    if ( this.image ) {
      this.image.pos = this.pos;
      this.image.render();
    }

    if ( this.interactimage ) {
      this.interactimage.pos = this.pos;
      this.interactimage.color = rgb(1,1,1,0.9)
      this.interactimage.render();
    }
  }

  update() {
    super.update();

    var triggerAction = false;

    if ( this.unTriggerOnRelease && !this.world.checkInteractKeysDown() ) this.triggered = false;

    if ( !this.triggered && this.actionTrigger == "collide" && this.collideTrigger() ) triggerAction = true;
    if ( !this.triggered && this.actionTrigger == "interact" && this.interactTrigger() ) triggerAction = true;
    if ( !this.triggered && this.actionTrigger == "bobber" && this.bobberTrigger() ) triggerAction = true;
    // if ( !this.triggered && this.actionTrigger == "proximity" && this.proximityTrigger() ) triggerAction = true;

    if ( triggerAction ) {
      var player = this.world.getEntityByHandle(this.world.player);
      player.fishingRodOut = false;
      new this.action(this).trigger();
    }

    // add visible method onto controllerEntity class and have this only update if animation is actually visible

    this.animationCount = this.animationCount + 1;
    if ( this.animationCount >= this.animationSpeed ) {
      this.animationCount = 0;
      if ( this.animationStep >= this.animationSteps.length ) { this.animationStep = 0 }

      var animationStepXY = vec2(this.animationSteps[this.animationStep][0], this.animationSteps[this.animationStep][1]);
      this.interactimage = new SpriteSheetImage(animationStepXY, vec2(500, 500), this.pos, 1, images["interact"]);
      this.animationStep = this.animationStep + 1;
    }
  }

  collideTrigger() {
    var player = this.world.getEntityByHandle(this.world.player);
    
    if ( !player ) return false;

    if (isOverlapping(this.pos, this.size, player.pos, player.size)) return true;

    return false;
  }

  interactTrigger() {
    return this.collideTrigger() && this.world.checkInteractKeysDown()
  }

  bobberTrigger() {
    var player = this.world.getEntityByHandle(this.world.player);

    if ( !player ) return false;
    if ( !player.fishingRod ) return false;
    if ( !player.fishingRod.bobberLanded ) return false;

    if (isOverlapping(this.pos, this.size, player.fishingRod.bobberPos, vec2(0.3,0.3))) return true;

    return false;
  }
}

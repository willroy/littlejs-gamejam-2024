class FishingRodUI {
  constructor(player) {
    this.player = player;
    this.world = player.world;

    this.dir = "down"
    this.dirs = {
      "down": [0,0],
      "left": [0,1000],
      "right": [0,2000],
      "up": [0,3000]
    };

    this.fishing = false;
    this.bobberLanded = false;
    this.bobberPos = vec2(this.player.pos.x, this.player.pos.y-1);
  }

  render() {
    if ( this.image == null ) {
      var tilePos = vec2(this.dirs["down"][0], this.dirs["down"][1])
      this.image = new SpriteSheetImage(tilePos, vec2(1000,1000), this.player.pos, 4, images["fishingRod"]);
    }
    this.image.pos = this.player.pos;
    this.image.render();

    if ( this.fishing ) {
      drawText("+", this.bobberPos, 1, rgb(0,0,1,0.3));
    } 
  }

  update() {                                                                                              
    if ( keyIsDown("KeyF") && this.player.fishingRodReady ) {
      display.quitUI();
      this.destroy();
      return;
    }

    // if ( checkInteractKeysDown() && inFishingZone && lookingInRightDir && !this.fishing ) {}
    if ( this.world.checkInteractKeysDown() && !this.fishing && !this.resetBobber) {
      this.fishing = true;
      this.world.frozen = true;
      this.bobberPos = vec2(this.player.pos.x, this.player.pos.y-1);
    }

    if ( this.world.checkInteractKeysDown() && this.fishing && !this.bobberLanded && !this.resetBobber ) {
      var movement = [];
      if ( this.dir == "down" ) movement = vec2(0,-0.1);
      if ( this.dir == "up" ) movement = vec2(0,0.1);
      if ( this.dir == "right" ) movement = vec2(0.1,0);
      if ( this.dir == "left" ) movement = vec2(-0.1,0);
      this.bobberPos.x = this.bobberPos.x + movement.x;
      this.bobberPos.y = this.bobberPos.y + movement.y;
    }

    if ( this.world.checkInteractKeys() && this.fishing ) {
      this.bobberLanded = true;
    }

    if ( this.world.checkInteractKeysDown() && this.fishing && this.bobberLanded ) {
      this.fishing = false;
      this.bobberLanded = false;
      this.resetBobber = true;
      this.world.frozen = false;
    }

    if ( this.world.checkInteractKeys() && this.resetBobber ) {
      this.resetBobber = false;
    }
  }

  changeDir(newDir) {
    var tilePos = vec2(this.dirs[newDir][0], this.dirs[newDir][1])
    this.dir = newDir
    this.image = new SpriteSheetImage(tilePos, vec2(1000,1000), this.player.pos, 4, images["fishingRod"]);
  }
}

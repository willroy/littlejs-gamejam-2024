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
  }

  render() {
    if ( this.image == null ) {
      var tilePos = vec2(this.dirs["down"][0], this.dirs["down"][1])
      this.image = new SpriteSheetImage(tilePos, vec2(1000,1000), this.player.pos, 4, images["fishingRod"]);
    }
    this.image.pos = this.player.pos;
    this.image.render();
  }

  update() {
    if ( keyIsDown("KeyF") && this.player.fishingRodReady ) {
      display.quitUI();
      this.destroy();
      return;
    }
  }

  changeDir(newDir) {
    var tilePos = vec2(this.dirs[newDir][0], this.dirs[newDir][1])
    this.image = new SpriteSheetImage(tilePos, vec2(1000,1000), this.player.pos, 4, images["fishingRod"]);
  }
}

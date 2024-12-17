class FishingMinigameUI {
  constructor(triggerEntity) {
    this.triggerEntity = triggerEntity;
    this.world = triggerEntity.world;
    this.player = this.world.getEntityByHandle(this.world.player);

    this.pos = vec2(this.player.pos.x,this.player.pos.y)
    this.timerPos = vec2(this.pos.x+4.6, this.pos.y+4.45)
    this.progressBarPos = vec2(this.pos.x-4.3, this.pos.y-4.5)
    this.progressBarBottomOverlayPos = vec2(this.pos.x-4.3, this.pos.y-4.7)
    this.boundryXY = vec2(this.player.pos.x+0.2, this.player.pos.y-0.2)
    this.boundrySize = vec2(8.5, 9)

    this.background = new SingleImage(vec2(966,933), this.pos, 10, images["fishingMinigame_background"]);
    this.progressBar = new SingleImage(vec2(79,24), this.progressBarPos, 0.5, images["fishingMinigame_progressBar"]);
    this.progressBarBottomOverlay = new SingleImage(vec2(79,24), this.progressBarBottomOverlayPos, 0.5, images["fishingMinigame_progressBar"]);
    this.timer = new SpriteSheetImage(vec2(100,0), vec2(100,100), this.timerPos, 1, images["fishingMinigame_timer"]);

    this.timerTick = 0
    this.timerCount = 0
    this.timerSpeed = 150

    this.progressBarTick = 0

    this.fishPos = vec2(this.player.pos.x,this.player.pos.y)
    this.fish = new SingleImage(vec2(65,67), this.fishPos, 1, images["fishingMinigame_fish"]);
    this.fishMoving = false
    this.fishDir = vec2(0,0)

    this.startTimer = true
    this.startTimerTick = 0
    this.startTimerCount = 3
    this.startTimerSpeed = 60
  }

  render() {
    this.progressBar.render();
    this.progressBarBottomOverlay.render();
    this.background.render();
    this.fish.render();
    this.timer.render();

    if ( this.startTimer == true ) {
      drawRect(this.boundryXY, this.boundrySize, rgb(0.212, 0.325, 0.412, 0.5))
      drawText(this.startTimerCount, this.pos, 5, rgb(0.1,0.1,0.8,1));
    }
  }

  update() {

    // start game countdown

    if ( this.startTimer == true ) {
      this.startTimerTick = this.startTimerTick + 1
      if ( this.startTimerTick > this.startTimerSpeed ) {
        this.startTimerTick = 0;
        this.startTimerCount = this.startTimerCount - 1;
        if ( this.startTimerCount <= 0 ) {
          this.startTimer = false;
        }
      }
      return;
    }

    // gane clock timer

    this.timerTick = this.timerTick + 1
    if ( this.timerTick > this.timerSpeed ) {
      this.timerTick = 0;
      this.timerCount = this.timerCount + 1;
      if ( this.timerCount > 7 ) {
        this.world.frozen = false;
        this.player.fishingRodOut = true;
        this.player.fishingRod.fishing = false;
        this.player.fishingRod.bobberLanded = false;
        this.triggerEntity.triggered = false;
        display.quitUI();
      }
      this.timer = new SpriteSheetImage(vec2(100*this.timerCount,0), vec2(100,100), this.timerPos, 1, images["fishingMinigame_timer"]);
    }

    // fill progress bar if mouse on fish

    if ( mousePos.distanceSquared(this.fishPos) < 0.4 && this.progressBar.worldSize.y < 10.7 ) {
      this.progressBarTick = this.progressBarTick + 1
      this.progressBar.worldSize.y = this.progressBar.worldSize.y + (this.progressBarTick/10000)
      this.progressBar.pos.y = this.progressBar.pos.y + ((this.progressBarTick/10000)/2.4)
    }

    // finish if progress bar is full

    if ( this.progressBar.worldSize.y >= 10.7 ) {
      this.world.frozen = false;
      this.player.fishingRodOut = true;
      this.player.fishingRod.fishing = false;
      this.player.fishingRod.bobberLanded = false;
      this.triggerEntity.destroy();
      this.player.inventory.push(this.triggerEntity.handle)
      display.quitUI();
    }

    // fish move logic

    if ( this.fishMoving ) {
      var scaledFishDir = vec2(0,0)
      if ( this.fishDir.x == -1 ) scaledFishDir.x = this.fishDir.x + 0.95
      if ( this.fishDir.y == -1 ) scaledFishDir.y = this.fishDir.y + 0.95
      if ( this.fishDir.x == 1 ) scaledFishDir.x = this.fishDir.x - 0.95
      if ( this.fishDir.y == 1 ) scaledFishDir.y = this.fishDir.y - 0.95

      var newFishPos = this.fishPos.add(scaledFishDir);
      if ( isOverlapping(this.boundryXY, this.boundrySize, newFishPos, vec2(0.4,0.4)) ) {
        this.fishPos = newFishPos;
        this.fish.pos = this.fishPos;
      }
      else {
        this.fishMoving = false;
      }
    }

    if ( !this.fishMoving ) {
      var newFishDirX = Math.floor(Math.random() * (2 - -2 + 1) + -2);
      var newFishDirY = Math.floor(Math.random() * (2 - -2 + 1) + -2);
      this.fishDir = vec2(newFishDirX, newFishDirY);
      this.fishMoving = true;
    }

    var redirectChance = Math.floor(Math.random() * 15);
    if ( redirectChance == 4 ) this.fishMoving = false;
  }
}

class ControllerEntity extends Entity {
  constructor(zindex, handle, pos, size, rgba, world, image) {
    super(zindex, handle, pos, size, rgba, world, image);
    this.pos = vec2(16,8)

    this.inventory = [];

    this.speed = 0.15;

    this.animationSteps = {
      "up": [
        [0,1500],
        [500,1500],
        [1000,1500],
        [1500,1500]
      ],
      "down": [
        [0,0],
        [500,0],
        [1000,0],
        [1500,0]
      ],
      "left": [
        [0,500],
        [500,500],
        [1000,500],
        [1500,500]
      ],
      "right": [
        [0,1000],
        [500,1000],
        [1000,1000],
        [1500,1000]
      ]
    };

    this.dir = "down";

    this.animationCount = 0;
    this.animationStep = 0;
    this.animationSpeed = 20;
    this.animationIdle = false
  }

  render() {
    if (debug && debugOverlay) drawRect(this.pos, this.size, this.rgba, 0);

    if ( this.image ) {
      this.image.pos = this.pos;
      this.image.render();
    }

    if ( this.inventory.length > 0 ) {
      for ( var i = 0; i < this.inventory.length; i++ ) {
        var itemHandle = this.inventory[i];
        var colour = rgb(1,1,1);
        if ( this.world.items[itemHandle] ) {
          drawTextScreen(this.world.items[itemHandle]["name"], vec2(200, (60*i)+100), 16, colour);
          drawTextScreen(this.world.items[itemHandle]["description"], vec2(200, (60*i)+120), 12, colour);
        }
      }
    }
  }

  update() {
    super.update();

    if (this.world.frozen) return;

    if ( keyIsDown("ArrowLeft") && this.collisonCheck(this.pos.x-this.speed, this.pos.y) ) this.move(this.speed, 0, "left")
    if ( keyIsDown("ArrowRight") && this.collisonCheck(this.pos.x+this.speed, this.pos.y) ) this.move(0 - this.speed, 0, "right")
    if ( keyIsDown("ArrowUp") && this.collisonCheck(this.pos.x, this.pos.y+this.speed) ) this.move(0, 0 - this.speed, "up")
    if ( keyIsDown("ArrowDown") && this.collisonCheck(this.pos.x, this.pos.y-this.speed) ) this.move(0, this.speed, "down")

    if ( !keyIsDown("ArrowLeft") && !keyIsDown("ArrowRight") && !keyIsDown("ArrowUp") && !keyIsDown("ArrowDown") ) this.animationIdle = true;

    this.animationCount = this.animationCount + 1;
    if ( this.animationCount >= this.animationSpeed && !this.animationIdle ) {
      this.animationCount = 0;
      if ( this.animationStep >= this.animationSteps[this.dir].length ) { this.animationStep = 0 }

      var animationStepXY = vec2(this.animationSteps[this.dir][this.animationStep][0], this.animationSteps[this.dir][this.animationStep][1]);
      this.image = new SpriteSheetImage(animationStepXY, vec2(this.imageinfo[1], this.imageinfo[2]), this.pos, this.imageinfo[3], images[this.imageinfo[0]]);
      this.animationStep = this.animationStep + 1;
    }
  }

  move(xdiff, ydiff, dir) {
    this.world.reposition(xdiff, ydiff);
    this.animationIdle = false;
    if ( this.dir != dir ) {
      this.dir = dir;
      this.animationCount = 0;
      this.animationStep = 0;
      var animationStepXY = vec2(this.animationSteps[this.dir][this.animationStep][0], this.animationSteps[this.dir][this.animationStep][1])
      this.image = new SpriteSheetImage(animationStepXY, vec2(this.imageinfo[1], this.imageinfo[2]), this.pos, this.imageinfo[3], images[this.imageinfo[0]]);
      this.animationStep = this.animationStep + 1;
    }
  }

  collisonCheck(newX, newY) {
    const collisionTypes = ["ObjectEntity"];
    for (var i=0; i<this.world.entities.length;i++) {
      var entityType = this.world.entities[i].constructor.name;
      if (this.world.entities[i] !== this && collisionTypes.includes(entityType) && isOverlapping(vec2(newX, newY), this.size, this.world.entities[i].pos, this.world.entities[i].size)) {
        return false;
      }
    }
    return true;
  }
}

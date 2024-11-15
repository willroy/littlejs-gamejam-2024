class ControllerEntity extends Entity {
  constructor(pos, size, rgba, world) {
    super(pos, size, rgba, world);
    this.pos = vec2(15,8)
  }

  render() {
    drawRect(this.pos, this.size, this.rgba, 0, 0);
  }

  update() {
    super.update();

    if ( keyIsDown("ArrowUp") && this.collisonCheck(this.pos.x, this.pos.y+0.07) ) { this.world.pos.y = this.world.pos.y - 0.07 }
    if ( keyIsDown("ArrowDown") && this.collisonCheck(this.pos.x, this.pos.y-0.07) ) { this.world.pos.y = this.world.pos.y + 0.07 }
    if ( keyIsDown("ArrowLeft") && this.collisonCheck(this.pos.x-0.07, this.pos.y) ) { this.world.pos.x = this.world.pos.x + 0.07 }
    if ( keyIsDown("ArrowRight") && this.collisonCheck(this.pos.x+0.07, this.pos.y) ) { this.world.pos.x = this.world.pos.x - 0.07 }

  }

  collisonCheck(newX, newY) {
    const collisionTypes = ["ObjectEntity"]
    for (var i=0; i<this.world.entities.length;i++) {
      var entityType = this.world.entities[i].constructor.name;
      if (this.world.entities[i] !== this && collisionTypes.includes(entityType) && isOverlapping(vec2(newX, newY), this.size, this.world.entities[i].pos, this.world.entities[i].size)) {
        return false;
      }
    }
    return true;
  }
}
class ControllerEntity extends Entity {
  constructor(name, pos, size, rgba, world) {
    super(name, pos, size, rgba, world);
    this.pos = vec2(15,8)

    this.inventory = [];
  }

  render() {
    drawRect(this.pos, this.size, this.rgba, 0);

    if ( this.inventory.length > 0 ) {
      for ( var i = 0; i < this.inventory.length; i++ ) {
        var itemHandle = this.inventory[i];
        drawTextScreen(this.world.items[itemHandle]["name"], vec2(200, (60*i)+100), 16);
        drawTextScreen(this.world.items[itemHandle]["description"], vec2(200, (60*i)+120), 12);
      }
    }
  }

  update() {
    super.update();

    if ( keyIsDown("ArrowUp") && this.collisonCheck(this.pos.x, this.pos.y+0.07) ) { this.world.reposition(0, -0.07) }
    if ( keyIsDown("ArrowDown") && this.collisonCheck(this.pos.x, this.pos.y-0.07) ) { this.world.reposition(0, 0.07) }
    if ( keyIsDown("ArrowLeft") && this.collisonCheck(this.pos.x-0.07, this.pos.y) ) { this.world.reposition(0.07, 0) }
    if ( keyIsDown("ArrowRight") && this.collisonCheck(this.pos.x+0.07, this.pos.y) ) { this.world.reposition(-0.07, 0) }

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

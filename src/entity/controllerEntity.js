class ControllerEntity extends Entity {
  constructor(zindex, handle, pos, size, rgba, world, image) {
    super(zindex, handle, pos, size, rgba, world, image);
    this.pos = vec2(15,8)

    this.inventory = ["wood2", "wood3"];
    this.inventoryPos = 0;
    this.droppedItem = false;
  }

  render() {
    drawRect(this.pos, this.size, this.rgba, 0);

    if ( this.inventory.length > 0 ) {
      for ( var i = 0; i < this.inventory.length; i++ ) {
        var itemHandle = this.inventory[i];
        var colour = rgb(1,1,1);
        if ( this.inventoryPos == i ) colour = rgb(0.5,1,0.5);
        if ( this.world.items[itemHandle] ) {
          drawTextScreen(this.world.items[itemHandle]["name"], vec2(200, (60*i)+100), 16, colour);
          drawTextScreen(this.world.items[itemHandle]["description"], vec2(200, (60*i)+120), 12, colour);
        }
      }
    }

    if ( this.image ) {
      this.image.pos = this.pos;
      this.image.render();
    }
  }

  update() {
    super.update();

    if (this.world.frozen) return

    // const diff = 0.07
    const diff = 0.2

    if ( keyIsDown("ArrowUp") && this.collisonCheck(this.pos.x, this.pos.y+0.07) ) { this.world.reposition(0, 0 - diff) }
    if ( keyIsDown("ArrowDown") && this.collisonCheck(this.pos.x, this.pos.y-0.07) ) { this.world.reposition(0, diff) }
    if ( keyIsDown("ArrowLeft") && this.collisonCheck(this.pos.x-0.07, this.pos.y) ) { this.world.reposition(diff, 0) }
    if ( keyIsDown("ArrowRight") && this.collisonCheck(this.pos.x+0.07, this.pos.y) ) { this.world.reposition(0 - diff, 0) }

    for ( var i = 0; i < 9; i++ ) {
      if ( typeof this.inventory[i] !== 'undefined' && keyIsDown("Digit"+(i+1).toString()) ) {
        this.inventoryPos = i;
        break;
      }
    }

    if ( !keyIsDown("KeyQ") ) this.droppedItem = false;
    
    if ( !this.droppedItem && keyIsDown("KeyQ") ) {
      this.droppedItem = true;
      var dropPos = this.pos.subtract(this.world.pos);
      // need to re sort entities list by z index after this
      this.world.entities.push( new ActionEntity(
        0, 
        this.inventory[this.inventoryPos], 
        dropPos, 
        vec2(0.5,0.5), 
        rgb(1,1,0,1), 
        this.world, 
        "interact", 
        this.world.actions["ItemPickupAction"]
      ) );
      this.inventory.splice(this.inventoryPos, 1);
    }

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

class ControllerEntity extends Entity {
  constructor(x, y, world) {
    super(x, y, world);

    this.setCollision(true, true);
    this.mass = 0;
  }

  render() {
    super.render();
  }

  update() {
    super.update();

    if ( keyIsDown("ArrowUp") ) { this.pos.y = this.pos.y + 0.07 }
    if ( keyIsDown("ArrowDown") ) { this.pos.y = this.pos.y - 0.07 }
    if ( keyIsDown("ArrowLeft") ) { this.pos.x = this.pos.x - 0.07 }
    if ( keyIsDown("ArrowRight") ) { this.pos.x = this.pos.x + 0.07 }
  }
}
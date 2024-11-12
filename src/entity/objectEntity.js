class ObjectEntity extends Entity {
  constructor(x, y, world) {
    super(x, y, world);

    this.setCollision(true, true);
    this.mass = 10;
  }

  render() {
    super.render();
  }

  update() {
    super.update();
  }
}
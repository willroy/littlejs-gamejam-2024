class World {
  constructor() {
    this.entities = [];

    this.entities[0] = new ControllerEntity(10, 11, this);
    this.entities[1] = new ObjectEntity(8, 8, this);
  }

  render() {
    for ( entity in this.entites ) { entity.render(); }
  }

  update() {
    for ( entity in this.entites ) { entity.update(); }
  }
}
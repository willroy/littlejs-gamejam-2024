class World {
  constructor() {
    this.entities = [];

    this.entities[0] = new ControllerEntity(vec2(10, 11), vec2(1, 1), rgb(0.1,0.1,0.1,1), this, new SingleImage(735, 908, 17, 9, 4, 0));
    this.entities[1] = new ObjectEntity(vec2(12, 12), vec2(10, 1), rgb(0.5,0.1,0.1,1), this);
    this.entities[2] = new ObjectEntity(vec2(18, 12), vec2(10, 1), rgb(0.5,0.1,0.1,1), this);
    this.entities[3] = new ObjectEntity(vec2(18, 12), vec2(1, 10), rgb(0.5,0.1,0.1,1), this);
    this.entities[4] = new ObjectEntity(vec2(12, 12), vec2(1, 10), rgb(0.5,0.1,0.1,1), this);
  }

  render() {
    for ( entity in this.entites ) { entity.render(); }
  }

  update() {
    for ( entity in this.entites ) { entity.update(); }
  }
}
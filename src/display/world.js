class World {
  constructor(id) {
    this.id = id;
    this.pos = vec2(0,0);
    this.entities = this.loadEntities();
  }

  loadEntities() {
    fetch('data/world'+this.id+'/entities.json')
    .then((response) => response.json())
    .then((json) => {
      var newEntities = [];

      for ( var i = 0; i < json.length; i++ ) {
        const id = json[i].id;
        const type = json[i].type;
        const pos = json[i].pos;
        const size = json[i].size;
        const colour = json[i].colour;
        if ( json[i].type == "ControllerEntity" ) {
          newEntities.push(new ControllerEntity(vec2(pos[0],pos[1]), vec2(size[0],size[1]), rgb(colour[0],colour[1],colour[2],colour[3]), this));
        }
        else if ( json[i].type == "ObjectEntity" ) {
          newEntities.push(new ObjectEntity(vec2(pos[0],pos[1]), vec2(size[0],size[1]), rgb(colour[0],colour[1],colour[2],colour[3]), this));
        }
        else if ( json[i].type == "PhysicsObjectEntity" ) {
          newEntities.push(new PhysicsObjectEntity(vec2(pos[0],pos[1]), vec2(size[0],size[1]), rgb(colour[0],colour[1],colour[2],colour[3]), this));
        }
      }

      this.entities = newEntities;
    });
  }

  render() {
    for ( entity in this.entites ) { entity.render(); }
  }

  update() {
    for ( entity in this.entites ) { entity.update(); }

    if (debug && debugOverlay) {
      for (var i = 0; i < this.entities.length; i++) {
        if (isOverlapping(mousePos, vec2(0.1,0.1), this.entities[i].pos, this.entities[i].size)) {
          if (mouseIsDown(0)) this.entities[i].pos = mousePos;
        }
      }
      return true;
    }
  }
}
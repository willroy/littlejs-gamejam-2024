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
      this.createEntities(json);
    });
  }

  createEntities(json) {
    var newEntities = [];

    for ( var i = 0; i < json.length; i++ ) {
      const id = json[i].id;
      const type = json[i].type;
      const pos = json[i].pos;
      const size = json[i].size;
      const colour = json[i].colour;

      if ( json[i].type == "ControllerEntity" ) newEntities.push(new ControllerEntity(vec2(pos[0],pos[1]), vec2(size[0],size[1]), rgb(colour[0],colour[1],colour[2],colour[3]), this));
      else if ( json[i].type == "ObjectEntity" ) newEntities.push(new ObjectEntity(vec2(pos[0],pos[1]), vec2(size[0],size[1]), rgb(colour[0],colour[1],colour[2],colour[3]), this));
      else if ( json[i].type == "PhysicsObjectEntity" ) newEntities.push(new PhysicsObjectEntity(vec2(pos[0],pos[1]), vec2(size[0],size[1]), rgb(colour[0],colour[1],colour[2],colour[3]), this));
      else if ( json[i].type == "ActionEntity" ) {
        const actionTrigger = json[i].actionTrigger;
        const action = json[i].action;

        newEntities.push(new ActionEntity(vec2(pos[0],pos[1]), vec2(size[0],size[1]), rgb(colour[0],colour[1],colour[2],colour[3]), this, actionTrigger, action));
      }
    }

    this.entities = newEntities;
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
    }
  }

  uploadJSON(jsonString) {
    var json = JSON.parse(jsonString);

    this.createEntities(json);
  }

  downloadJSON() {
    var entitiesList = [];

    for ( var i = 0; i < this.entities.length; i++ ) {
      const id = i;
      const type = this.entities[i].constructor.name;
      const pos = [this.entities[i].pos.x, this.entities[i].pos.y];
      const size = [this.entities[i].size.x, this.entities[i].size.y];
      const colour = this.entities[i].colour;

      entitiesList[i] = {"id": id, "type": type, "pos": pos, "size": size, "colour": colour}
    }

    var entitiesJSON = JSON.stringify(entitiesList);

    var a = document.createElement("a");
    var file = new Blob([entitiesJSON], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'entities.json';
    a.click();
  }
}
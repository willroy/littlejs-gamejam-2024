class World {
  constructor(id) {
    this.id = id;
    this.pos = vec2(0,0);
    this.frozen = false;
    this.entities = [];
    this.loadData();
    this.background = new SingleImage(5477, 5359, 0, 0, 80, 1)

    // debug stuff

    this.debug_placedEntity = false;  
    
    this.actions = {
      "HelloAction": HelloAction
    }
  }

  reposition(xdiff, ydiff){
     if (this.frozen) return
      
     this.pos.x = this.pos.x + xdiff
     this.pos.y = this.pos.y + ydiff
  }

  loadData() {
    fetch('data/world'+this.id+'/entities.json')
    .then((response) => response.json())
    .then((json) => {
      this.createEntities(json);
    });
    fetch('data/world'+this.id+'/dialog.json')
    .then((response) => response.json())
    .then((json) => {
      this.dialog = json;
    });
  }

  createEntities(json) {
    var newEntities = [];
    
    var jsonEntities = json.toSorted((a, b) => b.zindex - a.zindex);

    for ( var i = 0; i < jsonEntities.length; i++ ) {
      const ent = jsonEntities[i];
      const name = ent.name;
      const zindex = ent.zindex;
      const type = ent.type;
      const pos = ent.pos;
      const size = ent.size;
      const rgba = ent.rgba;
      if (name){
        console.log("Building "+name);
      }

      if ( type == "ControllerEntity" ) newEntities.push(new ControllerEntity(vec2(pos[0],pos[1]), vec2(size[0],size[1]), rgb(rgba[0],rgba[1],rgba[2],rgba[3]), this));
      else if ( type == "ObjectEntity" ) newEntities.push(new ObjectEntity(vec2(pos[0],pos[1]), vec2(size[0],size[1]), rgb(rgba[0],rgba[1],rgba[2],rgba[3]), this));
      else if ( type == "PhysicsObjectEntity" ) newEntities.push(new PhysicsObjectEntity(vec2(pos[0],pos[1]), vec2(size[0],size[1]), rgb(rgba[0],rgba[1],rgba[2],rgba[3]), this));
      else if ( type == "ActionEntity" ) {
        const actionTrigger = ent.actionTrigger;
        const action = ent.action;

        newEntities.push(new ActionEntity(
          name,
          vec2(pos[0],pos[1]), 
          vec2(size[0],size[1]), 
          rgb(rgba[0],rgba[1],rgba[2],rgba[3]), 
          this, 
          actionTrigger, 
          this.actions[action])
        );
      }
    }

    this.entities = newEntities;
  }

  render() {  
    this.background.render();

    for ( entity in this.entites ) { entity.render(); }
  }

  update() {
    this.background.posX = this.pos.x;
    this.background.posY = this.pos.y;

    for ( entity in this.entites ) { entity.update(); }

    // debug stuff

    if (debug && debugOverlay) {
      if (!keyIsDown("KeyI")) this.debug_placedEntity = false;

      var closestObject = null;
      let bestDistance = Infinity;

      for (var i = 0; i < this.entities.length; i++) {
        const distance = mousePos.distanceSquared(this.entities[i].pos);
        if (distance < bestDistance) {
            bestDistance = distance;
            closestObject = this.entities[i];
        }
      }

      if ( closestObject == null ) return;

      if (mouseIsDown(0)) {
        closestObject.originalPos.x = mousePos.x-this.pos.x;
        closestObject.originalPos.y = mousePos.y-this.pos.y;
      } 
      else if (keyIsDown("KeyH")) closestObject.size.x = closestObject.size.x - 0.1;
      else if (keyIsDown("KeyJ")) closestObject.size.x = closestObject.size.x + 0.1;
      else if (keyIsDown("KeyV")) closestObject.size.y = closestObject.size.y - 0.1;
      else if (keyIsDown("KeyB")) closestObject.size.y = closestObject.size.y + 0.1;
      else if (keyIsDown("KeyO")) {
        closestObject.destroy();
        this.entities.splice(closestObject.id, 1);
      }
      if (keyIsDown("KeyI") && !this.debug_placedEntity) {
        this.debug_placedEntity = true;
        this.entities.push(new ObjectEntity(vec2(mousePos.x-this.pos.x, mousePos.y-this.pos.y), vec2(1,1), rgb(0,0,0,1), this));
      }
    }
  }

  uploadJSON(jsonString) {
    var json = JSON.parse(jsonString);

    for ( var i = 0; i < this.entities.length; i++ ) {
      this.entities[i].destroy();
    }

    this.entities = [];

    this.createEntities(json);
  }

  downloadJSON() {
    var entitiesList = [];

    for ( var i = 0; i < this.entities.length; i++ ) {
      const id = i;
      const type = this.entities[i].constructor.name;
      const pos = [this.entities[i].originalPos.x, this.entities[i].originalPos.y];
      const size = [this.entities[i].size.x, this.entities[i].size.y];
      const rgba = [this.entities[i].rgba.r, this.entities[i].rgba.g, this.entities[i].rgba.b, this.entities[i].rgba.a];

      if ( type == "ActionEntity" ) {
        const actionTrigger = this.entities[i].actionTrigger;
        const action = this.entities[i].action;
        entitiesList[i] = {"id": id, "type": type, "pos": pos, "size": size, "rgba": rgba, "actionTrigger": actionTrigger, "action": action}
      }
      else {
        entitiesList[i] = {"id": id, "type": type, "pos": pos, "size": size, "rgba": rgba}
      }
    }

    var entitiesJSON = JSON.stringify(entitiesList);

    var a = document.createElement("a");
    var file = new Blob([entitiesJSON], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'entities.json';
    a.click();
  }
}

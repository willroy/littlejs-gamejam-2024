class World {
  constructor(id) {
    this.id = id;
    this.pos = vec2(0,0);
    this.frozen = false;
    this.entities = [];
    this.background = new SingleImage(vec2(5477,5359), vec2(0, 0), 80, images["area1"]);
    this.backgroundOver = new SingleImage(vec2(5477,5359), vec2(0, 0), 80, images["area1Over"]);

    this.player = "hedgehog";
    this.actions = {
      "DialogAction": DialogAction,
      "ItemPickupAction": ItemPickupAction,
      "IntroDialogAction": IntroDialogAction,
      "FountainDialogAction": FountainDialogAction,
      "BeaverDialogAction": BeaverDialogAction,
      "ToolboxAction": ToolboxAction,
      "MusicBoxAction": MusicBoxAction,
      "FountainLeverAction": FountainLeverAction,
      "GateAction": GateAction,
      "EndScreenAction": EndScreenAction
    }

    this.loadData();

    // debug stuff

    this.debug_placedEntity = false;
  }

  reposition(xdiff, ydiff) {
     if (this.frozen) return;
      
     this.pos.x = this.pos.x + xdiff;
     this.pos.y = this.pos.y + ydiff;
  }

  loadData() {
    fetch('data/world'+this.id+'/dialog.json')
    .then((response) => response.json())
    .then((json) => {
      this.dialog = json;
    });
    fetch('data/world'+this.id+'/items.json')
    .then((response) => response.json())
    .then((json) => {
      this.items = json;
    });
    fetch('data/world'+this.id+'/entities.json')
    .then((response) => response.json())
    .then((json) => {
      this.createEntities(json);
    });
  }

  createEntities(json) {
    var newEntities = [];
    
    var jsonEntities = json.toSorted((a, b) => a.zindex - b.zindex);

    for ( var i = 0; i < jsonEntities.length; i++ ) {
      const ent = jsonEntities[i];
      const zindex = ent.zindex;
      const handle = ent.handle;
      const type = ent.type;
      const pos = vec2(ent.pos[0],ent.pos[1]);
      const size = vec2(ent.size[0],ent.size[1]);
      const rgba = rgb(ent.rgba[0],ent.rgba[1],ent.rgba[2],ent.rgba[3]);
      const world = this;
      const image = ent.image;

      if (handle) console.log("Building "+handle);

      if ( type == "Entity" ) newEntities.push( new Entity( zindex, handle, pos, size, rgba, world, image ) );
      else if ( type == "ControllerEntity" ) newEntities.push( new ControllerEntity( zindex, handle, pos, size, rgba, world, image ) );
      else if ( type == "ObjectEntity" ) newEntities.push( new ObjectEntity( zindex, handle, pos, size, rgba, world, image ) );
      else if ( type == "PhysicsObjectEntity" ) newEntities.push( new PhysicsObjectEntity( zindex, handle, pos, size, rgba, world, image ) );
      else if ( type == "ActionEntity" ) {
        const actionTrigger = ent.actionTrigger;
        const action = this.actions[ent.action];

        newEntities.push( new ActionEntity( zindex, handle, pos, size, rgba, world, image, actionTrigger, action ) );
      }
    }

    this.entities = newEntities;
  }

  render() { 
    this.background.render();

    for ( entity in this.entites ) { entity.render(); }
  }

  renderPost() {
    this.backgroundOver.render();
  }

  update() {
    if (this.frozen) return;

    this.background.pos = this.pos;
    this.backgroundOver.pos = this.pos;

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
      else if (keyIsDown("KeyF")) { 
        var player = this.getEntityByHandle(this.player);
        if ( player.speed == 0.2 ) player.speed = 0.08;
        else player.speed = 0.2;
      }
      else if (keyIsDown("KeyO")) {
        closestObject.destroy();
        this.entities.splice(closestObject.id, 1);
      }
      else if (keyIsDown("KeyC")) {
        console.log('{\n    "zindex":0,\n    "type":"ObjectEntity",\n    "pos":['+closestObject.originalPos.x+','+closestObject.originalPos.y+'],\n    "size":['+closestObject.size.x+','+closestObject.size.y+'],\n    "rgba":[0,0,0,1]\n}');
      }
      else if (keyIsDown("KeyI") && !this.debug_placedEntity) {
        this.debug_placedEntity = true;
        this.entities.push(new ObjectEntity(0, null, vec2(mousePos.x-this.pos.x, mousePos.y-this.pos.y), vec2(1,1), rgb(0,0,0,1), this));
      }
    }
  }

  destroyByHandle(handle) {
    var entity = this.getEntityByHandle(handle);
    this.entities.splice(this.entities.indexOf(entity), 1);
    entity.destroy();
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
      const ent = this.entities[i];
      const zindex = ent.zindex;
      const handle = ent.handle;
      const type = ent.constructor.name;
      const pos = [ent.originalPos.x,ent.originalPos.y];
      const size = [ent.size.x,ent.size.y];
      const rgba = [ent.rgba.r,ent.rgba.g,ent.rgba.b,ent.rgba.a];
      const image = ent.image;

      if ( type == "ActionEntity" ) {
        const actionTrigger = this.entities[i].actionTrigger;
        const action = this.entities[i].action.prototype.constructor.name;

        entitiesList[i] = {"zindex": zindex, "handle": handle, "type": type, "pos": pos, "size": size, "rgba": rgba, "actionTrigger": actionTrigger, "action": action}
      }
      else {
        entitiesList[i] = {"zindex": zindex, "handle": handle, "type": type, "pos": pos, "size": size, "rgba": rgba, "image": [image.imageID, image.tileSize[0], image.tileSize[1], image.scale]}
      }
    }

    var entitiesJSON = JSON.stringify(entitiesList);

    var a = document.createElement("a");
    var file = new Blob([entitiesJSON], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'entities.json';
    a.click();
  }

  getEntityByHandle(handle) {
    for ( var i = 0; i < this.entities.length; i++ ) {
      if ( this.entities[i].handle === handle ) {
        return this.entities[i];
      }
    }
    return null;
  }
}

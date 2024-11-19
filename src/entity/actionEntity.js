class ActionEntity extends Entity {
  constructor(name, pos, size, rgba, world, actionTrigger, action) {
    super(pos, size, rgba, world);
    this.name = name;
    this.actionTrigger = actionTrigger;
    this.action = action;
    this.triggered = false;
  }

  render() {
    super.render();
  }

  update() {
    super.update();

    if ( !this.triggered && this.actionTrigger == "collide" && this.collideTrigger() ) {
      action.trigger();
    }  
    if ( !this.triggered && this.actionTrigger == "interact" && this.interactTrigger() ) {
      // var action = new actions[this.action](this);
      this.action.trigger();
    }
    // if ( this.actionTrigger == "proximity" ) this.proximityTrigger(); 
  }

  collideTrigger() {
    const collisionTypes = ["ControllerEntity"]
    for (var i=0; i<this.world.entities.length;i++) {
      var entityType = this.world.entities[i].constructor.name;
      if (this.world.entities[i] !== this && collisionTypes.includes(entityType) && isOverlapping(vec2(this.pos.x, this.pos.y), this.size, this.world.entities[i].pos, this.world.entities[i].size)) {
        return true;
      }
    }

    return false;
  }

  interactTrigger() {
    const collisionTypes = ["ControllerEntity"]
    console.log("Interact?? " + this.name);
    for (var i=0; i<this.world.entities.length;i++) {
      var entityType = this.world.entities[i].constructor.name;
      var isAnotherEntity = this.world.entities[i] !== this
      var isSupportedEntityType = collisionTypes.includes(entityType)
      var overlaps = isOverlapping(vec2(this.pos.x, this.pos.y), this.size, this.world.entities[i].pos, this.world.entities[i].size)

      if (isAnotherEntity && isSupportedEntityType && overlaps) {
        if ( keyIsDown("KeyE") ) {
          console.log("Yup!")
          return true;
        }
      }
    }
    console.log("Nope!")

    return false;
  }
}
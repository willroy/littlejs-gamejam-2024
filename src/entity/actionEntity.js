class ActionEntity extends Entity {
  constructor(zindex, handle, pos, size, rgba, world, actionTrigger, action) {
    super(zindex, handle, pos, size, rgba, world);
    this.actionTrigger = actionTrigger;
    this.action = action;
    this.triggered = false;
    this.unTriggerOnRelease = false;
  }

  render() {
    super.render();
  }

  update() {
    super.update();

    var triggerAction = false;

    if ( !this.triggered && this.actionTrigger == "collide" && this.collideTrigger() ) triggerAction = true;
    if ( !this.triggered && this.actionTrigger == "interact" && this.interactTrigger() ) triggerAction = true;
    // if ( !this.triggered && this.actionTrigger == "proximity" && this.proximityTrigger() ) triggerAction = true;

    if ( triggerAction ) new this.action(this).trigger();

    if ( this.unTriggerOnRelease && !keyIsDown("KeyE") ) this.triggered = false;
  }

  collideTrigger() {
    const collisionTypes = ["ControllerEntity"]
    for (var i=0; i<this.world.entities.length;i++) {
      var entityType = this.world.entities[i].constructor.name;
      var isAnotherEntity = this.world.entities[i] !== this;
      var isSupportedEntityType = collisionTypes.includes(entityType);
      var overlaps = isOverlapping(vec2(this.pos.x, this.pos.y), this.size, this.world.entities[i].pos, this.world.entities[i].size);

      if (isAnotherEntity && isSupportedEntityType && overlaps) {
        return true;
      }
    }

    return false;
  }

  interactTrigger() {
    return this.collideTrigger() && keyIsDown("KeyE")
  }
}

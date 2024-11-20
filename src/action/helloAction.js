class HelloAction {
    constructor(world, triggerEntity) {
      this.world = world;
      this.triggerEntity = triggerEntity;
    }

    trigger(){
        this.triggerEntity.triggered = true;
        var lines = this.world.dialog[this.triggerEntity.name][0]
        this.world.entities.push(new DialogEntity(lines, this.triggerEntity, this.world))
    }
}
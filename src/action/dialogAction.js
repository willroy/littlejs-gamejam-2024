class DialogAction {
    constructor(world, triggerEntity) {
      this.world = world;
      this.triggerEntity = triggerEntity;
    }

    trigger(){
        this.triggerEntity.triggered = true;
        var dialogData = this.world.dialog[this.triggerEntity.name]
        this.world.entities.push(new DialogEntity(dialogData, this.triggerEntity, this.world))
    }
}
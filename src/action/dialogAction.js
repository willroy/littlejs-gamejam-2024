class DialogAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
      this.world = this.triggerEntity.world;
    }

    trigger(){
        this.triggerEntity.triggered = true;
        var dialogData = this.world.dialog[this.triggerEntity.handle]
        this.world.entities.push(new DialogEntity(dialogData, this.triggerEntity, this.world))
    }
}
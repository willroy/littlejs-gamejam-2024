class DialogAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
      this.world = this.triggerEntity.world;
      this.dialogHandle = this.triggerEntity.handle;
      this.triggerEntitySelfDestruct = false;
    }

    trigger() {
        this.triggerEntity.triggered = true;
        
        var dialogData = this.world.dialog[this.dialogHandle];
        var dialogEntity = new DialogEntity(dialogData, this.triggerEntity, this.world);
        if ( this.triggerEntitySelfDestruct ) dialogEntity.selfDestruct = true;

        this.world.entities.push(dialogEntity);
    }
}
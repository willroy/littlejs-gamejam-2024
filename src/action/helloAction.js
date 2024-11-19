class HelloAction {
    constructor(world, triggerEntity) {
      this.world = world;
      this.triggerEntity = triggerEntity;
    }

    trigger(){
        this.triggerEntity.triggered = true;
        var lines = this.world.dialog[this.triggerEntity.name][0]
        for (var i = 0; i < lines.length; i++){
          console.log(lines[i])
        }
    }
}

class BuildBridgeAction {
    constructor(triggerEntity) {
      this.triggerEntity = triggerEntity;
      this.world = triggerEntity.world;
    }

    trigger() {
        var player = this.world.getEntityByHandle(this.world.player);
        this.triggerEntity.destroy();
        this.world.getEntityByHandle("bridgeBlocker").destroy()
        player.inventory.splice(player.inventory.indexOf("wood1"), 1);
        player.inventory.splice(player.inventory.indexOf("wood2"), 1);
        player.inventory.splice(player.inventory.indexOf("wood3"), 1);
        player.inventory.splice(player.inventory.indexOf("wood4"), 1);
        player.inventory.splice(player.inventory.indexOf("wood5"), 1);
    }
}
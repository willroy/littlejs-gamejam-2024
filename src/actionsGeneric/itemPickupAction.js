class ItemPickupAction {
	constructor(triggerEntity) {
		this.triggerEntity = triggerEntity;
		this.world = this.triggerEntity.world;
		this.itemHandle = this.triggerEntity.handle;
	}

	trigger() {
		var player = this.world.getEntityByHandle("hedgehog");
		player.inventory.push(this.itemHandle);
		this.triggerEntity.destroy();
	}
}
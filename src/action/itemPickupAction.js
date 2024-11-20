class ItemPickupAction {
	constructor(world, triggerEntity, itemHandle) {
		this.world = world;
		this.triggerEntity = triggerEntity;
		this.itemHandle = itemHandle;
	}

	trigger() {
		var player = this.world.getEntityByName("hedgehog");
		player.inventory.push(this.itemHandle);
		this.triggerEntity.destroy();
	}
}
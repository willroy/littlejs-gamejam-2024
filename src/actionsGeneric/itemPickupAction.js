class ItemPickupAction {
	constructor(triggerEntity, itemHandle) {
		this.triggerEntity = triggerEntity;
		this.world = this.triggerEntity.world;
		if ( itemHandle ) this.itemHandle = itemHandle
		else this.itemHandle = this.triggerEntity.handle;
	}

	trigger() {
		var player = this.world.getEntityByHandle(this.world.player);
		player.inventory.push(this.itemHandle);
		this.triggerEntity.destroy();
	}
}
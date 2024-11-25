class ToolboxUI {
  constructor(world) {
    this.world = world;
    var player = this.world.getEntityByHandle(this.world.player);
    this.toolboxClosed = new SingleImage(500, 500, player.pos.x, player.pos.y, 10, 2);
  }

  render() {
    this.toolboxClosed.render();
  }

  update() {
  }
}
class ToolboxUI {
  constructor(world) {
    this.world = world;
    var player = this.world.getEntityByHandle(this.world.player);
    this.toolboxClosed = new SingleImage(vec2(500,500), player.pos, 10, 2);
  }

  render() {
    this.toolboxClosed.render();
  }

  update() {
  }
}
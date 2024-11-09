class Image {
  constructor(tilePosX, tilePosY, tileWidth, tileHeight, posX, posY, scale, imageID) {
    this.tilePosX = tilePosX
    this.tilePosY = tilePosY
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    this.posX = posX
    this.posY = posY
    this.scale = scale
    this.imageID = imageID

    this.exampleImage = new TileInfo(vec2(this.tilePosX, this.tilePosY), vec2(this.tileWidth, this.tileHeight), this.imageID)
  }

  render() {
    drawTile(vec2(this.posX, this.posY), vec2(this.scale, this.scale), this.exampleImage)
  }
}
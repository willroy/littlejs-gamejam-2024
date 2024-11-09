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
    this.visible = true
  }

  render() {
    if ( !this.visible ) return

    drawTile(vec2(this.posX, this.posY), vec2(this.scale, this.scale), this.image)
  }

  update() {

  }
}

class SingleImage extends Image {
  constructor(width, height, posX, posY, scale, imageID) {
    super(0, 0, width, height, posX, posY, scale, imageID);
    
    this.image = new TileInfo(vec2(this.tilePosX, this.tilePosY), vec2(this.tileWidth, this.tileHeight), this.imageID)
  }

  update() {
    super.update()
  }
}

class SpriteSheetImage extends Image {
  constructor(tilePosX, tilePosY, tileWidth, tileHeight, posX, posY, scale, imageID) {
    super(tilePosX, tilePosY, tileWidth, tileHeight, posX, posY, scale, imageID);
    
    this.image = new TileInfo(vec2(this.tilePosX, this.tilePosY), vec2(this.tileWidth, this.tileHeight), this.imageID)
  }

  update() {
    super.update()
  }
}

class Animation extends Image {
  constructor(frameCount, frameCols, frameWidth, frameHeight, width, height, posX, posY, scale, imageID) {
    super(0, 0, width, height, posX, posY, scale, imageID);

    this.frameCount = frameCount
    this.frameCols = frameCols
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.currentFrame = 0
    this.frameTime = 10
    this.time = 0

    this.image = new TileInfo(vec2((this.currentFrame-(this.currentFrame/this.frameCols))*this.frameWidth, (this.currentFrame/this.frameCols)*this.frameHeight), vec2(this.frameWidth, this.frameHeight), this.imageID)
  }

  update() {
    this.time = this.time + 1
    if ( this.time % this.frameTime == 0 ) this.currentFrame++;

    this.image = new TileInfo(vec2((this.currentFrame-(this.currentFrame/this.frameCols))*this.frameWidth, (this.currentFrame/this.frameCols)*this.frameHeight), vec2(this.frameWidth, this.frameHeight), this.imageID)

    super.update()
  }
}
class Image {
  constructor(tilePos, tileSize, pos, scale, imageID) {
    this.tilePos = tilePos;
    this.tileSize = tileSize;
    this.pos = pos;
    this.worldSize = vec2((this.tileSize.x/this.tileSize.y), 1).multiply(vec2(scale,scale));
    this.imageID = imageID;
    this.visible = true;
    this.color = null;
  }

  render() {
    if ( !this.visible ) return;

    if ( this.color != null ) {
      drawTile(this.pos, this.worldSize, this.image, this.color);
    }
    else {
      drawTile(this.pos, this.worldSize, this.image);
    }
  }

  update() {

  }
}

class SingleImage extends Image {
  constructor(tileSize, pos, scale, imageID) {
    super(vec2(0,0), tileSize, pos, scale, imageID);

    this.image = new TileInfo(this.tilePos, this.tileSize, this.imageID);
  }

  update() {
    super.update();
  }
}

class SpriteSheetImage extends Image {
  constructor(tilePos, tileSize, pos, scale, imageID) {
    super(tilePos, tileSize, pos, scale, imageID);
    
    this.image = new TileInfo(this.tilePos, this.tileSize, this.imageID);
  }

  update() {
    super.update();
  }
}

class Animation extends Image {
  constructor(frameCount, frameCols, frameSize, tileSize, pos, scale, imageID) {
    super(vec2(0,0), tileSize, pos, scale, imageID);

    this.frameCount = frameCount;
    this.frameCols = frameCols;
    this.frameSize = frameSize;
    this.currentFrame = 0;
    this.frameTime = 10;
    this.time = 0;

    this.image = new TileInfo(vec2((this.currentFrame-(this.currentFrame/this.frameCols))*this.frameSize.x, (this.currentFrame/this.frameCols)*this.frameSize.y), vec2(this.frameSize.x, this.frameSize.y), this.imageID);
  }

  update() {
    this.time = this.time + 1;
    if ( this.time % this.frameTime == 0 ) this.currentFrame++;

    this.image = new TileInfo(vec2((this.currentFrame-(this.currentFrame/this.frameCols))*this.frameSize.x, (this.currentFrame/this.frameCols)*this.frameSize.y), vec2(this.frameSize.x, this.frameSize.y), this.imageID);

    super.update()
  }
}

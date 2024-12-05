function isMouseIn(boxOrigin, boxSize){
  var minX = boxOrigin.x - boxSize.x / 2;
  var maxX = boxOrigin.x + boxSize.x / 2;
  var minY = boxOrigin.y - boxSize.y / 2;
  var maxY = boxOrigin.y + boxSize.y / 2;

  return mousePos.x > minX && mousePos.x < maxX &&  mousePos.y > minY && mousePos.y < maxY;
}


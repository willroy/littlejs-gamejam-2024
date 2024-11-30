'use strict';

setShowSplashScreen(true);

var display

var imageSources = [
  'assets/area1.png', 'assets/area1Over.png',
  'assets/toolboxOpen.png', 'assets/toolboxClosed.png', 'assets/toolboxOpenWTool.png',
  'assets/example.png', 'assets/beaver.png', 'assets/squirrel.png',
  'assets/fountainFull.png', 'assets/fountainFullNoWood.png', 'assets/fountainLeverUp.png', 'assets/fountainLeverDown.png',  
]

var images = {
  "area1": 0,
  "area1Over": 1,
  "toolboxOpen": 2,
  "toolboxClosed": 3,
  "toolboxOpenWTool": 4,
  "hedgehog": 5,
  "beaver": 6,
  "squirrel": 7,
  "fountainFull": 8,
  "fountainFullNoWood": 9,
  "fountainLeverUp": 10,
  "fountainLeverDown": 11
}

var gameVariables = {
  "leverPiecePlaced": false
}

function gameInit()
{
  display = new Display(16, 8, 48)
}

function gameUpdate()
{
  display.update()
}

function gameUpdatePost()
{
}

function gameRender()
{
  display.render()
}

function gameRenderPost()
{
}

// start engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, imageSources);
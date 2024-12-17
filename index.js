'use strict';

setShowSplashScreen(true);

var display

var imageSources = [
  'assets/area1.png', 'assets/area1Over.png',
  'assets/toolboxClosed.png', 'assets/toolboxOpenWTool.png', 'assets/toolboxOpen.png',
  'assets/hedgehog.png', 'assets/beaver.png', 'assets/squirrel.png',
  'assets/fountainFull.png', 'assets/fountainFullNoWood.png', 'assets/fountainLeverUp.png', 'assets/fountainLeverDown.png',  
  'assets/musicboxClosed.png', 'assets/musicboxOpenWKey.png', 'assets/musicboxOpen.png',
  'assets/gateKey.png', 'assets/gateOpen.png',
  'assets/bridgeDone.png',
  'assets/endscreen.png',
  'assets/wood.png',
  'assets/shelf.png',
  'assets/shelfEmpty.png',
  'assets/controls.png',
  'assets/interact.png',
  'assets/fishingPole.png',
  'assets/fish.png',
  'assets/fishingMinigame_background.png',
  'assets/fishingMinigame_fish.png',
  'assets/fishingMinigame_progressBar.png',
  'assets/fishingMinigame_timer.png',
  'assets/cat.png', 'assets/catFish.png',
  'assets/fishingGuide.png'
]

var images = {
  "area1": 0,
  "area1Over": 1,
  "toolboxClosed": 2,
  "toolboxOpenWTool": 3,
  "toolboxOpen": 4,
  "hedgehog": 5,
  "beaver": 6,
  "squirrel": 7,
  "fountainFull": 8,
  "fountainFullNoWood": 9,
  "fountainLeverUp": 10,
  "fountainLeverDown": 11,
  "musicboxClosed": 12,
  "musicboxOpenWKey": 13,
  "musicboxOpen": 14,
  "gateKey": 15,
  "gateOpen": 16,
  "bridgeDone": 17,
  "endScreen": 18,
  "wood": 19,
  "shelf": 20,
  "shelfEmpty": 21,
  "controls": 22,
  "interact": 23,
  "fishingRod": 24,
  "fish": 25,
  "fishingMinigame_background": 26,
  "fishingMinigame_fish": 27,
  "fishingMinigame_progressBar": 28,
  "fishingMinigame_timer": 29,
  "cat": 30,
  "catFish": 31,
  "fishingGuide": 32
}

var gameVariables = {}

function gameInit()
{
  display = new Display(16, 8, 48)
  debugKey = "Semicolon";
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
  display.renderPost()
}

// start engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, imageSources);

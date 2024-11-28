'use strict';

setShowSplashScreen(true);

var display

var imageSources = ['assets/example.png', 'assets/area1.png', 'assets/toolboxClosed.png', 'assets/area1-over.png', 'assets/toolboxOpen.png', 'assets/toolboxOpenWTool.png']

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
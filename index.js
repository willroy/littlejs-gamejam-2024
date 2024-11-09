'use strict';

setShowSplashScreen(true);

var display

function gameInit()
{
  display = new Display(16, 8, 48)
}

function gameUpdate()
{
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
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);
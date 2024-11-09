'use strict';

setShowSplashScreen(true);

function gameInit()
{
  // viewport
  cameraPos = vec2(16,8);
  cameraScale = 48;
}

function gameUpdate()
{

}

function gameUpdatePost()
{

}

function gameRender()
{
  // background
  drawRect(vec2(16,8), vec2(20,14), hsl(0,0,.6), 0, 0);
}

function gameRenderPost()
{
  // text
  drawTextScreen('littlejs template', vec2(mainCanvasSize.x/2, 70), 80, hsl(0,0,1), 6, hsl(0,0,0));
}

// start engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);
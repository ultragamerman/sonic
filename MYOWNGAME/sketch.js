var sonicRun,sonic,sonicBall,sonicBallSlow,sonicDead,sonicStaticBall,sonicJump,sonicDash,sonicIdle;
var ground,groundImg,invisibleGround;
var obstacle,tunnelImg1;
var roseImg,obstaclesGroup;
var obstacleChooser,score;
var gameState=0,playerState;
var stamina = 100,staminaBar,staminaLevel,staminaBarImg;
/**
 * playerState0=idle
 * playerState1=run
 * playerState2=dash
 * playerState3=ball
 * playerState4=jump
 * playerState5=static ball
 * playerState6=dead
 */
function preload(){
  sonicIdle = loadAnimation("Sonic Idle 1.png","Sonic Idle 2.png","Sonic Idle 3.png","Sonic Idle 4.png","Sonic Idle 5.png","Sonic Idle 4.png","Sonic Idle 5.png","Sonic Idle 4.png","Sonic Idle 5.png","Sonic Idle 4.png","Sonic Idle 6.png")
  sonicBall = loadAnimation("Sonic Ball 1.png","Sonic Ball 2.png","Sonic Ball 3.png","Sonic Ball 4.png");
  sonicDead = loadAnimation("Sonic Dead 2.png");
  sonicStaticBall = loadAnimation("Sonic Static Ball.png");
  sonicDash = loadAnimation("Sonic SpeedRun 1.png","Sonic SpeedRun 2.png","Sonic SpeedRun 3.png","Sonic SpeedRun 4.png");
  sonicJump = loadAnimation("Sonic Jump 1.png","Sonic Jump 2.png","Sonic Jump 3.png","Sonic Jump 4.png");
  tunnelImg1 = loadImage("hollowLog.png");
  roseImg = loadImage("rose.png");
  groundImg = loadImage("ground.png");
  staminaBarImg = loadImage("bar.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);

  sonic = createSprite(75,displayHeight-75,20,20);
  
  ground = createSprite(displayWidth/2,displayHeight-70,displayWidth,10);
  ground.addImage(groundImg);
  
  invisibleGround=createSprite(displayWidth/2,displayHeight-65,displayWidth,10);
  invisibleGround.visibility = false;

  obstaclesGroup = new Group();
}

function draw(){
  background("white");
  sonic.collide(invisibleGround);
  sonic.velocityY += 0.75;
  if(gameState == 0){
    playerState = 0;
    if(keyDown("SPACE")){
      gameState = 1;
    }
  }
  if(gameState==1){
    score++;
    if(stamina<100&&keyCode!==39){
      stamina+=0.5
    }
    text("Score:"+score,displayWidth-50,50);
    staminaBar = createSprite(displayWidth-75,75,102,22);
    staminaBar.addImage(staminaBarImg);
    staminaLevel = createSprite(displayWidth-75,100,stamina,20);
    if(stamina>50){
      staminaLevel.shapeColor("green");
    }else if(stamina>25&&stamina<50){
      staminaLevel.shapeColor("yellow");
    }else{
      staminaLevel.shapeColor("red");
    }
    ground.velocityX = -(6 + 3*score/100);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnObstacles();
    if(keyDown("RIGHT_ARROW")&&stamina>0){
      playerState=2;
      stamina-=0.02;
    }else if(keyDown("LEFT_ARROW")){
      playerState=1;
    }else if(keyDown("UP_ARROW")){
      playerState=4;
      if(sonic.y<180){
        sonic.velocityY=sonic.velocityY-12;
      }

    }
    playerStateCheck();
  }
  drawSprites();
}

function spawnObstacles(){
  obstacleChooser = random(0,1);
  if(World.framecount%60===0){
    if(obstacleChooser = 0){
      obstacle = createSprite(displayWidth,displayHeight-75,50,20);
      obstacle.addImage(tunnelImg1);
      obstacle.velocityX = ground.velocityX;
      obstaclesGroup.add(obstacle);
    }else{
      obstacle = createSprite
    }
  }
}
function playerStateCheck(){
  if(playerState==0){
    sonic.changeAnimation("idle",sonicIdle);
  }
  if(playerState==1){
    sonic.changeAnimation("running",sonicRun);
  }
  if(playerState==2){
    sonic.changeAnimation("dashing",sonicDash);
  }
  if(playerState==3){
    sonic.changeAnimation("rolling",sonicBall);
  }
  if(playerState==4){
    sonic.changeAnimation("jumping",sonicJump);
  }
  if(playerState==5){
    sonic.changeAnimation("static",sonicStaticBall);
  }
  if(playerState==6){
    sonic.changeAnimation("dead",sonicDead);
  }
}
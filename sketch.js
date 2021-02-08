
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine,world;

var gameState = 0;
var database;
var form;
var game;

var player;
var playerCount;
var allPlayers;

var player1,player2;
var players;

var nameDisplayed;

var invisibleGround;

var position1,position2;

var monsterAnimation;

var monsterCreated;



//walls/obstacles for the map
var wallImage,lavaImage,spikeImage;
var wall1,wall2,wall3,wall4,wall5,wall6;
var lava7;
var spike8,spike9,spike10;
var wall9,wall10,wall11;
var wall12,wall13,wall14,wall15;
var lava16;
var door;

var monster;
var barrier;


function preload(){
  wallImage = loadImage("gameFiles/wall.jpg");
  lavaImage = loadImage("gameFiles/lava.png");
  spikeImage = loadImage("gameFiles/spike.png");
  doorImage = loadImage("gameFiles/door/frame_0_delay-0.2s.png");

  monsterAnimation = loadAnimation("skeletonwalk1.png","skeletonwalk2.png","skeletonwalk3.png","gameFiles/monsterWalk/skeletonwalk4.png","gameFiles/monsterWalk/skeletonwalk5.png","gameFiles/monsterWalk/skeletonwalk6.png","gameFiles/monsterWalk/skeletonwalk7.png","gameFiles/monsterWalk/skeletonwalk8.png");
  monsterFinished = loadImage("skeletonwalk1.png");
}


function setup() {
  database = firebase.database();
  engine = Engine.create();
  world = engine.world;
	canvas = createCanvas(displayWidth,displayHeight);
	game = new Game();
  game.getState();
  game.start();

  nameDisplayed = false;
  monsterCreated = false;

  

  invisibleGround = createSprite(displayWidth,displayHeight/15*14,displayWidth*300,20);
  invisibleGround.visible = false;
  invisibleGround.depth = 5;

  wall1 = createSprite(displayWidth/3*2,displayHeight/15*12.5,10,10);
  wall1.addImage(wallImage);
  wall1.depth = 4

  wall2 = createSprite(displayWidth,displayHeight/15*12.5,10,10);
  wall2.addImage(wallImage);
  wall2.depth = 4

  wall3 = createSprite(displayWidth,displayHeight/15*12.5 - wall2.height,10,10);
  wall3.addImage(wallImage);
  wall3.depth = 4

  wall4 = createSprite(displayWidth/3*4,displayHeight/15*12.5 - wall2.height*1.5,10,10);
  wall4.addImage(wallImage);
  wall4.depth = 4

  wall5 = createSprite(displayWidth/3*5.5,displayHeight/15*12.5 - wall2.height,10,10);
  wall5.addImage(wallImage);
  wall5.depth = 4

  wall6 = createSprite(displayWidth/3*5.5,displayHeight/15*12.5,10,10);
  wall6.addImage(wallImage);
  wall6.depth = 4

  lava7 = new Lava((wall2.x + wall6.x) / 2,displayHeight/15*13.5,wall6.x - wall6.width/2 - wall2.x - wall2.width/2,100);

  spike6 = createSprite(displayWidth/3*7,displayHeight/15*13.75,10,10);
  spike6.addImage(spikeImage);
  spike6.depth = 4
  spike6.scale = 0.5;

  spike7 = createSprite(displayWidth/3*8,displayHeight/15*13.75,10,10);
  spike7.addImage(spikeImage);
  spike7.depth = 4
  spike7.scale = 0.5;

  spike8 = createSprite(displayWidth/3*9,displayHeight/15*13.75,10,10);
  spike8.addImage(spikeImage);
  spike8.depth = 4
  spike8.scale = 0.5;

  wall9 = createSprite(displayWidth/3*10,displayHeight/15*12.5,10,10);
  wall9.addImage(wallImage);
  wall9.depth = 4

  wall10 = createSprite(displayWidth/3*11,displayHeight/15*12.5,10,10);
  wall10.addImage(wallImage);
  wall10.depth = 4

  wall11 = createSprite(displayWidth/3*11,displayHeight/15*12.5 - wall10.height,10,10);
  wall11.addImage(wallImage);
  wall11.depth = 4

  wall12 = createSprite(displayWidth/3*12,displayHeight/15*12.5 - wall10.height,10,10);
  wall12.addImage(wallImage);
  wall12.depth = 4

  wall13 = createSprite(displayWidth/3*13,displayHeight/15*12.5 - wall10.height,10,10);
  wall13.addImage(wallImage);
  wall13.depth = 4

  wall14 = createSprite(displayWidth/3*14,displayHeight/15*12.5,10,10);
  wall14.addImage(wallImage);
  wall14.depth = 4

  wall15 = createSprite(displayWidth/3*14,displayHeight/15*12.5 - wall10.height,10,10);
  wall15.addImage(wallImage);
  wall15.depth = 4

  lava16 = new Lava((wall10.x + wall14.x) / 2,displayHeight/15*13.5,wall15.x - wall15.width/2 - wall10.x - wall10.width/2,100);

  door = createSprite(displayWidth/3*14.75,displayHeight/15*12.5,10,10);
  door.addImage(doorImage);
  door.depth = 5;
  door.scale = 0.5;

  monster = createSprite(-800,400);
  monster.addAnimation("e",monsterAnimation);
  monster.scale = 3;
 // monster.debug = true;
  monster.setCollider("rectangle",0,5,100,65);

  barrier = createSprite(door.x + 150,displayHeight/2,10,displayHeight);
  barrier.visible = false;

}


function draw() {
  rectMode(CENTER);
  background(0);
  

  if(playerCount >= 2){
    gameState == 1;
    game.update(1);
  }

  if(gameState == 1){
    game.play();
    lava7.display();
    lava16.display();
            

    monster.collide(invisibleGround);
    monster.collide(wall1);
    monster.collide(wall2);
    monster.collide(wall3);
    monster.collide(wall4);
    monster.collide(wall5);
    monster.collide(wall6);
    monster.collide(wall9);
    monster.collide(wall10);
    monster.collide(wall11);
    monster.collide(wall12);
    monster.collide(wall13);
    monster.collide(wall14);
    monster.collide(wall15);
    monster.collide(barrier);

    if(monster.collide(barrier)){
      monster.setImage(monsterFinished);
    }

    if(monster.x < door.x){
      monster.velocityX = 2;
    }

    monster.velocityY = monster.velocityY + 2;

    if(monster.x == (wall1.x - wall1.width/2) - 150){
      monster.velocityY = -25;
    }

    if(monster.x == (wall2.x - wall2.width/2) - 150){
      monster.velocityY = -25;
    }

    if(monster.x == (wall4.x - wall4.width/2) - 150){
      monster.velocityY = -25;
    }

    if((wall4.x + wall4.width/2) - 10 < monster.x && monster.x < (wall5.x - wall5.width/2)){
      monster.velocityY = -15;
      monster.velocityX = 5;
    }

    if(monster.x == (wall9.x - wall9.width/2) - 150){
      monster.velocityY = -25;
    }

    if(monster.x == (wall10.x - wall10.width/2) - 150){
      monster.velocityY = -25;
    }

    if(monster.x == (wall11.x - wall11.width/2) - 150){
      monster.velocityY = -25;
    }

    if(monster.x == (wall12.x - wall12.width/2) - 150){
      monster.velocityY = -25;
    }

    if(monster.x == (wall13.x - wall13.width/2) - 150){
      monster.velocityY = -25;
    }

    if(monster.x == (wall14.x - wall14.width/2) - 150){
      monster.velocityY = -25;
    }

    if(monster.x == 9440){
      monster.velocityX = 0;
    }


    if(keyDown(LEFT) && camera.position.x >= form.background.x){
      camera.position.x = camera.position.x - 50;
    }

    if(keyDown(RIGHT) && camera.position.x <= form.background5.x){
      camera.position.x = camera.position.x + 50;
    }
  }

}




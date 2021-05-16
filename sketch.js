var monkey,monkey_running
var banana,banana_img,bananapeeled_img;
var banana_group;
var obstacle,obstacleimg;
var obstacle_group;
var score=0;
var ground_green;
var star_img, star;
var star_group;
var ig;
var gameState="start";
var gameover_img;
var gameover;
var monkey_rest_img;

function preload(){
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  monkey_rest_img=loadAnimation("sprite_1.png");  

  banana_img=loadImage("banana.png");
  banana_peeled_img=loadImage("banana_peeled.png");
  obstacle_img=loadImage("obstacle.png");
  star_img=loadImage("star.png");
  gameover_img=loadImage("gameover.png");

  banana_group=new Group();
  obstacle_group=new Group();
  star_group=new Group();
}

function setup() {
  createCanvas(600,400);

  //monkey
  monkey=createSprite(100,302);
  monkey.addAnimation("monkey running",monkey_running);
  monkey.addAnimation("monkey at rest",monkey_rest_img);
  monkey.scale=0.15;


  //green ground
  ground_green=createSprite(300,370,600,80);
  ground_green.shapeColor="green";

  monkey.depth=ground_green.depth;
  monkey.depth=monkey.depth+1;
  monkey.setCollider("circle",0,0,226);

  //invisible ground
  ig=createSprite(100,340,200,8);
  ig.visible=false;

  //gameover
  gameover=createSprite(300,200);
  gameover.addImage(gameover_img);
  gameover.visible=false;
}


function draw() {
  background("black");

  console.log(Math.round(monkey.y));
  console.log(gameState);  

  monkey.debug=true;
  monkey.collide(ig);
  if(gameState=="start"){

    gameover.visible=false;
    monkey.changeAnimation("monkey at rest",monkey_rest_img); 

    fill("yellow");
    textSize(23);
    text("Press space key to start the game",130,190);  
    score=0;

    if(keyDown("space")){
    gameState="play";
    }
  }  

  if(gameState=="play"){

    gameover.visible=false;
    monkey.changeAnimation("monkey running",monkey_running);  

    stars();
    bananas();
    jump_gravity();
    obstacles();

    if(monkey.isTouching(banana_group)){
    score=score+1;
  }    

  if(monkey.isTouching(obstacle_group)){
    gameState="over";
  }  

  } 

  if(gameState=="over"){

      stars();
      star_group.setVelocityXEach(0);

      monkey.changeAnimation("monkey at rest",monkey_rest_img);

      gameover.visible=true;

      star_group.destroyEach();
      banana_group.destroyEach();

    if(keyDown("R")){
     gameState="start";
    }  
  }
   //score
  fill("white");
  textSize(26);
  text("Score:"+score,width-130,50);
  drawSprites();
  
}

function stars(){

  var rand=Math.round(random(10,170))

  if(frameCount%100==0){
    star=createSprite(width+20,rand);
    star.addImage(star_img);
    star.velocityX=-3;
    star.scale=0.028;
    star_group.add(star);
  }
}

function bananas(){
  
  var rand2=Math.round(random(190,220));

  if(frameCount%144==0||frameCount%197==0){
    banana=createSprite(width+20,rand2);
    banana.addImage(banana_peeled_img);
    banana.addImage(banana_img);
    banana.velocityX=-7;
    banana.scale=0.1;
    
    if(banana.x<200){
      banana.destroy();
    }
    banana_group.add(banana);
  } 
}

function jump_gravity(){

  //jump
  if(keyDown("space")&&monkey.y>300){
    monkey.velocityY=-25;
  }

  //gravity
  monkey.velocityY=monkey.velocityY+2.4;

}

function obstacles(){

  if(frameCount%170==0){
    obstacle=createSprite(width+20,ig.y-30);
    obstacle.addImage(obstacle_img);
    obstacle.scale=0.2;
    obstacle.velocityX=-15;
    obstacle_group.add(obstacle);
  }
}

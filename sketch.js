var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;


function preload()
{
  dogImg = loadImage("Dog.png");
  dogHappyImg = loadImage("happydog.png");
  

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  emo = createSprite(200,200,1,1);
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(50);
  
  for (var i = 5; i < 500; i=i+10) 
{

var dot = createSprite(i, 5, 3, 3);
dot.shapeColor = "yellow";

}

}


function draw() {  
  background(46,139,87)

  if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);

   
  }

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
  }
}

if(foodS == 0){
  
  dog.addImage(dogImg);
  foodS = 50;

}



  drawSprites();
  textSize(17);
  fill("yellow");
  text("I am your Puppy...I am Hungry ",100,150);
  fill("white");
  text(" up arrow key to feed your pet dog ",50,50);
  fill("cyan");
  text("Milk Bottles Remaining  "+foodS,170,440);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref().update({
    food:x
  })
}


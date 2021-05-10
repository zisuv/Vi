var database ,dog,dog1,dog2
var position
//var form
var feed,add;
var foodobject;
var Feedtime;
var lastFed;
var foodStock;
//Create variables here

function preload()

{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("FEED TOMMY")
  feed.position(500,15)
  feed.mousePressed(feedDog)
  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(addFood)

} 

function draw(){
 background(46,139,87);
 
 foodobject.display();

 FeedTime=database.ref('FeedTime');
 FeedTime.on("value",function(data){
  lastFed=data.val();
 });

 if(lastFed>=12){
   text("Last Feed " + lastFed%12 + " PM" );
 }else if(lastFed==0){
   text("Last Feed : 12 AM" ,350,30);
 }else{
  text("Last Feed " + lastFed + " AM" );
 }


 drawSprites();
  
 fill(255,255,254);
 textSize(15);

}
function readStock(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function addFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function feedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}

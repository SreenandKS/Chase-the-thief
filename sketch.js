var title,start,gameState=0,player,thief,dis1,dis2,car,rand,car1,car2,car3,c1,c2,c3,shoot;

function preload(){
    back1 = loadImage("background.jpg");
    track = loadImage("track.jpg");
    playerCar = loadImage("police car.png");
    thiefCar = loadImage("thief car.png");
    car1 = loadImage("car1-removebg-preview (1).png");
    car2 = loadImage("car2-removebg-preview (1).png");
    car3 = loadImage("car3-removebg-preview.png");
    back2 = loadImage("surrendeed.jpg");
    back3 = loadImage("dead.jpg");
    sound = loadSound("VerySuspensefulMusic2018-10-29_-_The_Chase_of_My_Life_-_David_Fesliyan.mp3");
}

function setup(){
    canvas = createCanvas(960,540);
    title = createElement('h1');
    title.position(750,520);
    title.html("CHASE THE THIEF");
    title.style('color','white');
    title.style('fontSize','50px');

    cars = createGroup();

    start = createButton('START');
    start.position(680,360);
    start.style('width','200px');
    start.style('height','20px');
    
    player = createSprite(150,450);
    player.addImage("car",playerCar);
    player.scale = 0.35;
    player.debug = true;
    player.setCollider("rectangle",0,0,200,450);
    player.visible = false;

    thief = createSprite(350,200);
    thief.addImage("thief",thiefCar);
    thief.scale = 0.25;
    thief.velocityY = -50;
    thief.debug = true;
    thief.visible = false;
    
    shoot = createButton('SHOOT');
    shoot.position(680,360);
    shoot.hide();

    if(gameState===0){
        sound.play();
    }
}

function draw(){

    background(back1);
    if(gameState===3){
        background(back3);
        fill("red");
        textSize(30);
        text("Thief dead and mission accomplished",680,360);
    }
    if(gameState===1){
        image(track,0,-height*400,width,height*500);

        player.visible = true;
        thief.visible = true;

        spawnCars1();
        spawnCars2();
        spawnCars3();
    }


    rand = Math.round(random(1,3));

    start.mousePressed(()=>{
        start.hide();
        title.hide();
        gameState = 1;
       
       
    })
    
    start.style('background','lightGreen');
 
  

    if(gameState===2){
        
        background(back2);
        player.visible = false;
        thief.visible = false;
        
           
            fill("red");
            textSize(30);
            text("Thief is caught and mission accomplished",680,360);
           
        
    }
   

//    for(var i=0;i<cars.length;i++){
//        if(cars.get(i).isTouching(player)){
//            gameState = 4;
//        }
//    }
  
    if(thief.isTouching(player)){
        gameState = 4;
    }


   if(gameState===4){
       cars.setLifetimeEach(-1);
       thief.velocityY = 0;
       image(track,0,-height*400,width,height*500);
       fill("red");
        textSize(30);
        text("You are dead",680,player.y);
        text("Game Over",680,player.y+100);

   }
    camera.position.x = width/2
    camera.position.y = player.y;

    dis1 = thief.y;
    dis2 = player.y;

    if(dis2<dis1){
        gameState=2;
        thief.velocityY = 0;
        thief.y = player.y+100;
       
    }
console.log(player.y);
if(gameState===3){
    background(back3);
    fill("red");
    textSize(30);
    text("Thief dead and mission accomplished",680,360);
}

if(keyIsDown(UP_ARROW)&&gameState===1){
    player.y -= 60;
}
if(keyIsDown(RIGHT_ARROW)&&gameState===1){
    player.x += 20;
}
if(keyIsDown(LEFT_ARROW)&&gameState===1){
    player.x -= 20;
}

    drawSprites();

    if(gameState===2){
        fill("red");
        textSize(30);
        text("Thief is caught and mission accomplished",680,360);
    }

}

function spawnCars1(){
    if(frameCount%300===0){
        c1 = createSprite(random(300,800),player.y-400);
        c1.addImage("car1",car1);
        c1.scale = 0.5;
        c1.debug = true;
        c1.velocityY = 0;
        c1.lifetime = 90;
        c1.setCollider("rectangle",0,0,200,250);
        cars.add(c1);
    }
}

function spawnCars2(){
    if(frameCount%250===0){
        c2 = createSprite(random(300,800),player.y-400);
        c2.addImage("car2",car2);
        c2.scale = 0.5;
        c2.debug = true;
        c2.velocityY = 0;
        c2.lifetime = 90;
        c2.setCollider("rectangle",0,0,200,450);
        cars.add(c2);
    }
}

function spawnCars3(){
    if(frameCount%200===0){
        c3 = createSprite(random(300,800),player.y-400);
        c3.addImage("car3",car3);
        c3.scale = 0.25;
        c3.debug = true;
        c3.velocityY = 0;
        c3.lifetime = 90;
        c3.setCollider("rectangle",0,0,200,250);
        cars.add(c3);
    }
}
/*
 *
 * This code perform object creation and do actions listed below:
 * --------------------------------------------------------------
 * 
 * action : If space key is pressed then dart board and shuriken re-loaded.
 * action : click around Shuriken and drag mouse to throw shuriken.
 * 
 * action : if level is increased then the position and size of dartBoard changes (It goes farther from the ninja)
 * 
 * 
 */
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var totalCh = 3;
var balanceCh = totalCh;
var score = 0;
var level = 1;
var gamerState = 0;
var myColor = "blue";
var readyForFly = false;
var isLaunched = false;

var db_lvl1_x = 900;
var db_lvl1_y = 100;

var db_lvl2_x = 1000;
var db_lvl2_y = 600;
var levelchanged = 0;

// Displaying the score
scoreDis = [];

// Displaying the level
lvlDis = [];

// Displaying the total score
totalDis = [];


var scorestatus = 0, hitstatus = 0;


function preload() {
}

/*
 * create engine to run
 * create canvas to put objects
 * create objects - ground, shuriken, ninja, platforms, dartboard
 */
function setup(){
    // Create a canvas with x = 1530, y = 715
    var canvas = createCanvas(1530,715); 
    engine = Engine.create();
    world = engine.world;

    //Creating the objects
    ground = new Ground(765,height,1530,20);
    shuriken = new Shuriken(200,50);
    ninjaPlatform = new Ground(250, 270, 150, 240);
    horizPlatform = new Ground(900,155,150,10);
    dartBoard = new DartBoard(900, 100);
    ninja = new Ninja(shuriken.body,{x:200, y:50}, 200, 10);
}

function draw(){
    
    // Background is black (To show night background)
    background(0); 

    //Checking the gamerState in the console
    console.log(gamerState);

    //Updating the engine in draw
    Engine.update(engine);

    //Big text
    textSize(40);

    //Text for score and level
    text("score = " + score, 150,550); 
    text("level = " + level, 1050,550);
 
    //Instructions for getting another chance
    fill("yellow") 
    text("Press space for another chance! ", 400, 650);

    //Displaying the objects
    ninja.display();    

    ground.display();

    ninjaPlatform.display();
    horizPlatform.display();

    //If the level is 2 then horizontal platform and dartBoard's position is changes else if level is 3 then  the it changes to another position
    if (level === 2) {
        horizPlatform.changeGrPosition(1200, 200);
        dartBoard.changeDbPosition(1200,150)

    }  else if (level === 3){
       horizPlatform.changeGrPosition(1400, 250);
       dartBoard.changeDbPosition(1400,200)

    }
    dartBoard.display();

    //If the dartboad's speed is more than 3 (if its hit then speed increases) then it disappears
    if(dartBoard.body.speed > 3){
        dartBoard.removeDb()
    }
  
    dartBoard.score();    

    shuriken.display();

    if(level === 4) {
        
    }

    if(gamerState > 8){
        push();
        textSize(40);
        fill("orange");
        text("You have reached the end!", 330, 100);
        text("Hope the game was challenging!", 380, 200);
        pop();
    }

}

// Ma'am I tried to stop the shuriken from moving while dragged anywhere.
// I wanted it to move only if I dragged it near the ninja.
//When dragged the x and y is changed to mouseX and mouseY

    function mouseDragged(){
        if ( (mouseX >= -900 && mouseX <= 250 && mouseY >= 0 && mouseY <= 100 && readyForFly === false) || (isLaunched === true) ) {
            Matter.Body.setPosition(shuriken.body, {x: mouseX , y: mouseY}); 
            readyForFly = true;
        }
    }

    function mouseReleased(){
        //If mouse is released and readyForFly is true then ninja.fly(function to release shuriken) is executed
        if (readyForFly === true) {
            ninja.fly(); // In Ninja.js 
            isLaunched = true;
        }
    }
/*
 * If the space key (32) is pressed then:
 * -----------------------------------
 * Shuriken moves to its original place and gets attached to the ninja
 * Dartboard re-appears in its place(If hit) or stays where it is
 * 
 */
function keyPressed(){
  
        // if space key is pressed
        if(keyCode === 32 ){
            shuriken.trajectory = [];
            Matter.Body.setPosition(shuriken.body, {x:  200, y: 50});
           
            ninja.attach(shuriken.body);
            gamerState = gamerState + 1;
        }

        // If gamerState is multiples of 3, then level is changed
        if(gamerState === 3 || gamerState === 7 ){
            level = level + 1;
            // init=1
            // levelchanged =1;
          dartBoard.removeDb()
          NewDb()
            hitstatus = 0;

        }

        NewDb()

}



function NewDb(){
  if ( hitstatus === 1 && level === 1){
            // dartboard create one more when it disappears
          
            dartBoard = new DartBoard(900,100);
            hitstatus = 0;
        }else  if ( hitstatus === 1 && level === 2){
            // dartboard create one more when it disappears
         
            dartBoard = new DartBoard(1200,150);
            hitstatus = 0;
        }else  if ( hitstatus === 1 && level === 3){
            // dartboard create one more when it disappears
         
            dartBoard = new DartBoard(1400,200);
            hitstatus = 0;
        }

}
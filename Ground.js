/*
 *
 * Ground class is used for platforms and the ground. 
 *
 */ 
class Ground {

    constructor(x,y,width,height) {
      var options = {
          isStatic: true
      }
      this.body = Bodies.rectangle(x,y,width,height,options);
      this.width = width;
      this.height = height;
      World.add(world, this.body);
    }

    // Helps to change the position of the ground, platforms during different levels of the game
    changeGrPosition(x,y){  
      this.body.position.x = x;
      this.body.position.y = y;
    }

    // Displaying the ground
    display(){
      // variable myColor is blue and its set for the fill option.
      // creating the rectangle
      myColor = "blue";
      var pos = this.body.position;
      rectMode(CENTER);
      fill(myColor);
      rect(pos.x, pos.y, this.width, this.height);
    }
  };
//Creating a class - dartBoard
/* 
 *
 * x and y is inputted in the sketch.js
 * If its speed is above 3 it disappears(If its hit)
 * If its visibility is lower than -10, score adds by 100.
 *
 */
class DartBoard extends BaseClass {
  constructor(x, y){
    super(x,y,100,100);
    this.image = loadImage("DartBoard.png");
    this.Visiblity = 255;

 
  }

  display(){

    // If the speed of the dartBoard is less than 3 then it display dartboard
    if(this.body.speed < 3){
      super.display();
      hitstatus = 0;
   
    } 
 
  }

  removeDb(){
      World.remove(world, this.body);
      push();
      this.Visiblity = this.Visiblity - 5;
      tint(255,this.Visiblity);
      image(this.image, this.body.position.x, this.body.position.y, this.width, this.height);
      pop();
      hitstatus = 1; 
  }
  changeDbPosition(x, y){
        this.body.position.x = x;
        this.body.position.y = y;
      }

  score(){
    // If the visibilty is lower than -10 then the score is added by 100.
    if (this.Visiblity < 0 && this.Visiblity > -10){
      score = score + 100;
 
    }
  }
}

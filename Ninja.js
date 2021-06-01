/*
 *
 * Ninja object has a constraint which connects it to the shuriken.
 * 
 */
     class Ninja{

     constructor(bodyA, pointB, imgX, imgY){
 
        this.imageX = imgX;
        this.imageY = imgY;
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.09,
            length: 10
        }
        this.image = loadImage('download.png');
        this.pointB = pointB
        this.ninja = Constraint.create(options);
        World.add(world, this.ninja);
    }
    
    // It is used when space is pressed to attch the shuriken to ninja
    attach(body){
        this.ninja.bodyA = body;
    }
    
    // It is used to release the shuriken from ninja
    fly(){
        this.ninja.bodyA = null;
    }

    // This is to change the image's position when it goes to the different levels
    changePosition(imgX,imgY){
        this.imageX = imgX;
        this.imageY = imgY;
        World.remove(world,this.ninja)
    }


    display(){
        // Image is added here 
        image(this.image,this.imageX,this.imageY);

        // PointA is the the constraint's position beginning position
        // PointB is the shuriken's position
        if(this.ninja.bodyA){
            var pointA = this.ninja.bodyA.position;
            var pointB = this.pointB;
        }
    }
    
}
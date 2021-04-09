

//Mechanics for the paddle ball game.... bouncing off of the paddle. 

if (ball.hitTestObject(paddle)){
    ball.x = paddle.x + ball.width/2 + paddle.width/2;

    //Changes the direction of the ball so it travels in the opposite direction.
    ball.vx *= -ball.vx;

    //Checking for collision in the top portino of the paddle 
    if(ball.y < paddle.y - paddle.height/6){

        ball.vy = -5;
    }
    //Checking for collision in the bottom portion of the paddle 
    if(ball.y > paddle.y + paddle.height/6){

        ball.vy = -5;
    }

    //Checking for the middle portion of the paddle and bounces off. 
    if ( ball.y > paddle.y - paddle.height/6 && ball.y < paddle.y + paddle.height/6){
        ball.vy = 0;
    }



}
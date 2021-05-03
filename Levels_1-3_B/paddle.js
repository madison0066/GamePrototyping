// JavaScript Document

var canvas;
var context;
var timer;
var interval = 1000/60;
var player;
var ball;

var p1Wins = 0;


var frictionX = .75;	
var frictionY = .75;
var gravity = 1;





canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	
	


player = new GameObject();




player.x = canvas.width/2;
player.y = 550;
player.width = 250;
player.height = 40;
player.vy = 0;
player.vx = 0;

player.color = "cyan";



timer = setInterval(animate, interval);




//Draws the image for the ball 



ball= new GameObject();

ball.vx = 3;
//ball.vy = 4;

function animate()
    {
		context.clearRect(0,0,canvas.width, canvas.height);	

		context.strokeStyle = "black";
		context.beginPath();
		context.moveTo(ball.x, ball.y);
		context.lineTo(player.x, player.y)
		context.closePath();
		context.lineWidth = 3;
		context.stroke();

				
		//Image of Ric for the ball 
		


		//Boundaries for the paddle 

		if (player.x > canvas.width - player.width/2)
		{
			player.x =  canvas.width - player.width/2;
			
		}
		if ( player.x < player.width/2){
			player.x = player.width/2;
			
		}

        //--------------Bounce of Right----------------------

		if ( ball.x < 0 + ball.width/2){
			ball.vx = -ball.vx;
		
		}
		if ( ball.x > canvas.width + ball.width/2){
			ball.vx = -ball.vx;
		
		}
		
		if (ball.y > canvas.height - ball.width/2)
		{
			ball.vy = -ball.vy;
			p1Wins = 0;
			
		}
		if ( ball.y < 0 + ball.width/2){
			ball.vy = -ball.vy;
		
		}


		
			//Collision 


		// If the ball hits the first paddle or player 1s paddle
	if (ball.hitTestObject(player)){
		ball.x = player.x + ball.width/2 + player.width/2;
		console.log("hit paddle")
		//Changes the direction of the ball so it travels in the opposite direction.
		 ball.vx = -ball.vx;
		 p1Wins ++;


		//Checking for collision in the top portino of the paddle 
		if(ball.y < player.x - player.width/5){
	
			ball.vy = -25;
		
		}
		//Checking for collision in the bottom portion of the paddle 
		if(ball.y > player.x + player.width/5){
	
			ball.vy = -25;
		}
	
		//Checking for the middle portion of the paddle and bounces off. 
		if ( ball.y > player.x - player.width/5 && ball.y < player.x + player.height/5){
			ball.vx = 0;
		}

    }
        //--------------Use Velocity and Acceleration to move around----------------------
        if(d)
        {	
            console.log(player.vx =  player.force * player.force)
            player.vx =  player.force * player.force;
        }
        if(a)
        {
            console.log(player.vx = player.force * -player.force)
            player.vx = player.force * -player.force;
        }
      
        //---------------------------------------------------------------------------------------
        player.vx *= frictionX;
        player.x += player.vx;
       


		ball.drawCounter()
		//Draws the ball 
		ball.drawCircle()

		//ball.grav()
		
		//Moves the ball
		ball.ballMove()
		//Draws player 1
		player.drawRect()


		

    }







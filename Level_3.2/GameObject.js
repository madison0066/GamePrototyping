var canvas;
var context;
var timer;
var interval = 1000/60;
var ball;

var p1Wins = 0;
var p2Wins = 0;


canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	

ball= new GameObject();


function GameObject()
{
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	
	this.width = 50;
	this.height = 50;
	
	this.vx = 3;
	this.vy = 3;
	
	this.color = "#00000";
	
	
	this.drawCircle = function()
	{
		context.save();
			context.translate(this.x, this.y);
            context.beginPath();
            context.arc(0,0,this.width/2,0,360*Math.PI/180,true)
            context.fillStyle = this.color;
            context.closePath();
			context.fill();
			
		context.restore();

		
	}

	this.drawCounter = function(){
		//context.save();

			//context.translate(this.x, this.y);
			context.font = "30px Times New Roman";
			context.fillText(p1Wins, 450, 125)
			context.fillText(p2Wins, 560, 125)
			context.fillText("Player 1 || Player 2", 400, 75)
			//console.log(( 75, 125)
		//context.restore();
	}
		
	this.drawRect = function(){

		context.save();
			context.fillStyle = this.color;
			context.translate(this.x, this.y);
			context.fillRect((-this.width/2), (-this.height/2), this.width, this.height);
		context.restore();
	}
	
	//This changes the player's position
	this.ballMove = function()
	{
		this.x += this.vx;
		this.y += this.vy;
	}


	this.playerMove = function()
	{
		if(w == true)
		{	
			//this.vy += this.ay * -this.force;
			this.y -= this.vy;
		}
		if(s == true)
		{
			//this.vy += this.ay * this.force;
			this.y += this.vy;
	
		}

	}

	this.player2Move = function(){
		//Player 2 controls
		if(up == true)
		{
			this.y -= this.vy;
		}
		if(dwn == true)
		{	
			this.y += this.vy;
		}
	
	}

	

	this.left = function() 
	{
		return this.x - this.width/2;
	}
	this.right = function() 
	{
		return this.x + this.width/2;
	}
	
	this.top = function() 
	{
		return this.y - this.height/2;
	}
	this.bottom = function() 
	{
		return this.y + this.height/2;
	}

	this.hitTestObject = function(obj)
	{
		if(this.left() < obj.right() && 
		   this.right() > obj.left() &&
		   this.top() < obj.bottom() &&
		   this.bottom() > obj.top())
		{
			return true
		}
		return false;
	}
}


	ball.vx = 3;
	//ball.vy = 4;



	
	

    function animate()
    {
        context.clearRect(0,0,canvas.width, canvas.height);	
		
		//Boundaries for the paddle 

		if (player.y > canvas.height - player.height/2)
		{
			player.y =  canvas.height - player.height/2;
			
		}
		if ( player.y < player.height/2){
			player.y = player.height/2;
			
		}


		//Boundary for player 2

		if (player2.y > canvas.height - player2.height/2)
		{
			player2.y =  canvas.height - player2.height/2;
			
		}
		if ( player2.y < player2.height/2){
			player2.y = player2.height/2;
			
		}

        //--------------Bounce of Right----------------------
        if(ball.x > 1200 - ball.width/2)
        {
			ball.x = 512;
			ball.y = 400;
			p1Wins ++;	
        }
		// If the ball moves off of the left of the screen
        if ( ball.x < -200 + ball.width/2){
			
			ball.x = 512;
			ball.y = 400;
			p2Wins ++;

		}
		if (ball.y > canvas.height - ball.width/2)
		{
			ball.vy = -ball.vy;
			
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
		 ball.color = "#BA55D3"
	
	
		//Checking for collision in the top portino of the paddle 
		if(ball.y < player.y - player.height/6){
	
			ball.vy = -5;
			ball.color = "#BA55D3"
			

		}
		//Checking for collision in the bottom portion of the paddle 
		if(ball.y > player.y + player.height/6){
	
			ball.vy = 5;
			ball.color = "#BA55D3"
			
		}
	
		//Checking for the middle portion of the paddle and bounces off. 
		if ( ball.y > player.y - player.height/6 && ball.y < player.y + player.height/6){
			ball.vy = 0;
			ball.color = "#BA55D3"
			
		}

	}


	//Collision for player 2

	if (ball.hitTestObject(player2)){
		ball.x = player2.x - ball.width/2 - player2.width/2;
		console.log("hit paddle player 2")
		//Changes the direction of the ball so it travels in the opposite direction.
		 ball.vx = -ball.vx;
		 ball.color = "#00FFFF"
	
		//Checking for collision in the top portino of the paddle 
		if(ball.y < player2.y - player2.height/6){
	
			ball.vy = 5;
			ball.color = "#00FFFF"
	
		}
		//Checking for collision in the bottom portion of the paddle 
		if(ball.y > player2.y + player2.height/6){
	
			ball.vy = 5;
			ball.color = "#00FFFF"
	
		}
	
		//Checking for the middle portion of the paddle and bounces off. 
		if ( ball.y > player2.y - player2.height/6 && ball.y < player2.y + player2.height/6){
			ball.vy = 0;
			ball.color = "#00FFFF"
	
		}
	
	}

		

		ball.drawCounter()
		//Draws the ball 
		ball.drawCircle()
		//Moves the ball
		ball.ballMove()


		//Draws player 1
		player.drawRect()
		//Draws player 2
		player2.drawRect()

		//Moves player 1
		player.playerMove()
		//Moves player 2
		player2.player2Move()

    }
var canvas;
var context;
var timer;
var interval = 1000/60;
var ball;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	ball= new Ball();


function Ball()
{

	this.x = canvas.width/2;
	this.y = canvas.height/2;
	

	this.width = 100;
	this.height = 100;
	
	this.vx = 0;
	this.vy = 0;
	
	this.color = "#660066";
	
	
	this.draw = function()
	{
		context.save();
			context.translate(this.x, this.y);
            context.beginPath();
            context.arc(0,0,this.width,0,360*Math.PI/180,true)
            context.fillStyle = this.color;
            context.closePath();
            context.fill();
			
		context.restore();
		
	}	
	
	//This changes the player's position
	this.move = function()
	{
		this.x += this.vx;
		this.y += this.vy;
	}
}


	//------Declare the Player's speed on the x and y axis------
	//ball.vx = 2;
	//ball.vy = 0;
	//----------------------------------------------------
	
	timer = setInterval(animate, interval);


function animate()
{
	//context.clearRect(0,0,canvas.width, canvas.height);	
	//ball.move();
	
	//--------------Loop the Screen----------------------
	//if(ball.x > canvas.width + ball.width/2)
	//{
	//	ball.x = -ball.width/2	
	//}
	//---------------------------------------------------
	
	ball.draw();
}




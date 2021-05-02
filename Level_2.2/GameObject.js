var canvas;
var context;
var timer;
var interval = 1000/60;
var ball;


//var counter = 0;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	ball= new GameObject();

function GameObject()
{

	this.x = canvas.width/2;
	this.y = canvas.height/2;
	

	this.width = 75;
	this.height = 75;
	
	this.vx = 2;
	this.vy = 2;
	
	this.color = "#33FFE9";
	
	
	this.drawCircle = function()
	{
		context.save();
			context.translate(this.x, this.y);
            context.beginPath();
            context.arc(0,0,this.width/2,0,360*Math.PI/180,true)
            context.fillStyle = this.color;
            context.closePath();
			context.fill();
			
			//context.font = "30px Arial";
			//context.fillText(":)", 76, 10)
			
		context.restore();


		context.font = "30px Arial";
		//context.fillText(counter, 75, 125)
		//context.fillText("Counter", 75, 75)
		
	}
	
	
	this.drawRect = function(){
		context.save();
			context.fillStyle = this.color;
			context.translate(this.x, this.y);
			context.fillRect((-this.width/2), (-this.height/2), 25, 200);
		context.restore();
	}
	
	//This changes the player's position
	this.move = function()
	{
		//this.x += this.vx;
		//this.y += this.vy;

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
}


	ball.vx = 3;
	ball.vy = 3;
	
	
	

    function animate()
    {
        context.clearRect(0,0,canvas.width, canvas.height);	
        
        //----Movement Using the Player's move() function----
        //ball.move();
        //---------------------------------------------------
        
        //--------------Bounce of Right----------------------
        /*if(ball.x > canvas.width - ball.width/2)
        {
			
			ball.vx = -ball.vx;
			//counter ++;	
        }
    
        if ( ball.x < 0 + ball.width/2){
			ball.vx = -ball.vx;
			//counter++;

		}
		if (ball.y > canvas.height - ball.width/2)
		{
			ball.vy = -ball.vy;
			//counter++;
		}
		if ( ball.y < 0 + ball.width/2){
			ball.vy = -ball.vy;
			//counter++;
		
		}*/
        //---------------------------------------------------
		
		//Draws the ball 
		//ball.drawCircle();

		player.drawRect();

		player.move();
		
		console.log(player.x,player.y)

    }
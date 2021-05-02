


function GameObject()
{
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	
	this.width = 40;
	this.height = 40;
	
	this.vx = 3;
	this.vy = 0.67;
	
	this.color = "#ff00ff";
	
	this.gravity = 1;
	this.gravitySpeed = 0;
	this.force = 2;

	
	this.drawCircle = function()
	{
		context.save();
			context.translate(this.x, this.y);
            context.beginPath();
            context.arc(0,0,this.width/2,0,360*Math.PI/180,true)
            context.fillStyle = "#ff00ff";
            context.closePath();
			context.fill();
			
		context.restore();

		
	} 

	this.drawCounter = function(){
		//context.save();

			//context.translate(this.x, this.y);
			context.font = "16px Arial";
			context.color = "#555555"
			context.fillText(p1Wins, 80, 25)
			context.fillText("Score: ", 30, 25)
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


	this.drawLine = function(){
		context.beginPath();
		context.moveTo(canvas.width/2, player.height/2);
		context.lineTo(canvas.width/2, canvas.height/2);
		context.stroke();
	}

	this.showAcceleration = function()
{
	//--------------Use Velocity and Acceleration to move around----------------------
	if(d)
	{	
		player.vx +=  player.ax * player.force;
	}
	if(a)
	{
		player.vx += player.ax * -player.force;
	}
	if(w)
	{	
		player.vy += player.ay * -player.force;
	}
	if(s)
	{
		player.vy += player.ay * player.force;
	}
	//---------------------------------------------------------------------------------------
	player.x += player.vx;
	player.y += player.vy;
}

 this.showFriction = function()
{
	if(d)
	{	
		player.vx += player.ax * player.force;
	}
	if(a)
	{
		player.vx += player.ax * -player.force;
	}
	
	//--------------Apply friction to the Velocity X-----------------------------------------
	player.vx *= frictionX;
	player.vy *= frictionY;
	//---------------------------------------------------------------------------------------
	player.x += player.vx;
	player.y += player.vy;
}

this.showGravity = function()
{
	
	if(d)
	{	
		player.vx += player.ax * player.force;
	}
	if(a)
	{
		player.vx += player.ax * -player.force;
	}


}
	
	//This changes the player's position
	this.ballMove = function()
	{
		this.x += this.vx;
		this.y += this.vy;
	}


	/*this.grav = function(){
		this.gravitySpeed += this.gravity;
		this.x += this.vx;
		this.y += this.vy + this.gravitySpeed;
	}*/


	this.playerMove = function()
	{
		if(a == true)
		{	
			//this.vy += this.ay * -this.force;
			this.x -= this.vx;
		}
		if(d == true)
		{
			//this.vy += this.ay * this.force;
			this.x += this.vx;
	
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






	
	

    
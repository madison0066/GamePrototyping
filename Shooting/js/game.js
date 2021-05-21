
var canvas = document.getElementById("canvas");

var context = canvas.getContext("2d");

var interval = 1000/60;
var timer = setInterval(animate, interval);

var player = new GameObject({width:50, height:50, angle:0, x:canvas.width/2, y:canvas.height-100, force:1, color:"gray"})



//This is used to move the level elements
var level = new Level();
//This generates a tile based level.
	level.generate(level.l1, 150,150);	

//Stores the bullets
var bullets = [];
//Used to select a bullet to fire
var currentBullet = 0;
//The timer for each bullet
var fireCounter = 30;
var fireRate = 5;
//How far the bullet can go
var range = canvas.width/2;
//The amount of bullets to create
var bulletAmount = 25;
//Modifies the direction of the bullet when fired
var dir = {x:1,y:0};

for(var b = 0; b < bulletAmount; b++)
{
	bullets[b] = new GameObject({force:10, width:5, height:5});
	bullets[b].world = level;
	bullets[b].x = player.x;
	bullets[b].y = -1000;
}	



var fx = .85;
var fy = .85;

var states =[];
var currentState = "play";

//When moving the level, we first move the player as usual. Then we utilize an offset object to keep track of how much the collision detection affects the player's position. Then we move both the player and the level back the total number of pixels that the player moved over one loop of animation.

states["play"] = function()
{
	
	
	//Set the bullet directions when moving
	if(w)
	{
		player.vy += player.ay * -player.force;
		if(!a && !d){dir.x = 0;}
		dir.y = -1;
	}
	if(a)
	{
		player.vx += player.ax * -player.force;
		dir.x = -1;
		if(!w && !s){dir.y = 0;}
	}
	if(s)
	{
		player.vy += player.ay * player.force;
		if(!a && !d){dir.x = 0;}
		dir.y = 1;
	}
	if(d)
	{
		player.vx += player.ax * player.force;
		dir.x = 1;
		if(!w && !s){dir.y = 0;}
	}
	
	//----------------Firing Logic---------------------
	//bullet timer
	fireCounter--;
	
	if(space)
	{
		if(fireCounter <= 0)
		{
			//place the bullet at the player's position minus the bullet's world
			bullets[currentBullet].x = player.x - bullets[currentBullet].world.x;
			bullets[currentBullet].y = player.y - bullets[currentBullet].world.y;
			//set the velocity using the dir modifier
			bullets[currentBullet].vx = dir.x * bullets[currentBullet].force;
			bullets[currentBullet].vy = dir.y * bullets[currentBullet].force;
			//reset the fireCounter
			fireCounter = fireRate;
			//increment the currentBullet index so that you can use the next bullet
			currentBullet++;
			//reset the currentBullet index when you exceed the bulletAmount
			if(currentBullet >= bulletAmount)
			{
				currentBullet = 0;
			}
		}
	}
	else
	{
		//Allow the player to fire when click is pressed.
		fireCounter = 0;
	}
	
	
	
	player.vx *= fx;
	player.vy *= fy;
	
	player.x += player.vx;
	player.y += player.vy;
	
	//Used to move the player and level back so that it appears as though the level moved and not the player.
	var offset = {x:player.vx, y:player.vy};
	
	//All tile code
	for(var i = 0; i < level.grid.length; i++)
	{
		level.grid[i].drawRect();
		//Hit top
		while(level.grid[i].hitTestPoint(player.top()) && player.vy <= 0)
		{
			player.vy = 0;
			player.y++;
			offset.y++;
		}
		//Hit right
		while(level.grid[i].hitTestPoint(player.right()) && player.vx >= 0)
		{
			player.vx = 0;
			player.x--;
			offset.x--;
		}
		//Hit left
		while(level.grid[i].hitTestPoint(player.left()) && player.vx <= 0)
		{
			player.vx = 0;
			player.x++;
			offset.x++;
		}
		//Hit bottom
		while(level.grid[i].hitTestPoint(player.bottom()) && player.vy >= 0)
		{
			player.canJump = true;
			player.vy = 0;
			player.y--;
			offset.y--;
		}
		
	}
	
	
	//------------Move bullets and check for collision-------------------
	for(var b = 0; b < bullets.length; b++)
	{
		//-----------------Limits the range------------------
		
		var dx = bullets[b].x + bullets[b].world.x - player.x;
		var dy = bullets[b].y + bullets[b].world.y - player.y;
		var dist = Math.sqrt(dx * dx + dy * dy);
		if(dist >= range)
		{
			bullets[b].vx = 0;
			bullets[b].y = -1000;
		}
		
		//Checks collision against the tiles
		for(var i = 0; i < level.grid.length; i++)
		{
			if(level.grid[i].hitTestPoint(bullets[b]))
			{
				bullets[b].vx = 0;
				bullets[b].y = -1000;
			}
		}
	
		
		bullets[b].move();
		bullets[b].drawRect();
	
	}
	//Moves the level and the player back the total number of pixels traveled over one animation loop.
	player.x -= offset.x;
	player.y -= offset.y;
	level.x -= offset.x;
	level.y -= offset.y;
	
	//Draws the player
	player.drawRect();
	player.drawDebug();
}

//--------------------------------------------Animation Loop-------------------------------------------
function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	
	states[currentState]();
}




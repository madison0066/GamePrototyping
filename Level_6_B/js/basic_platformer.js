//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;


//Gets the object to move


	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	player = new GameObject({x:150});

	platform0 = new GameObject();
		platform0.width = 150;
		platform0.x = platform0.width/2;
		platform0.y = player.y +player.height/2 + platform0.height/2;
		platform0.color = "#66ff33";
		
	
	platform1 = new GameObject();
		platform1.width = 575;
		platform1.x = canvas.width -platform1.width/2;
		platform1.y = player.y +player.height/2 + platform1.height/2;
		platform1.color = "#66ff33";

	water = new GameObject();
		water.width = 1000;
		water.x = 500;
		water.y = 750;
		water.color = "#10C8E8";



	electricalCurrent = new GameObject();
		electricalCurrent.width = 25;
		electricalCurrent.height = 100;
		electricalCurrent.x = canvas.width -platform1.width/2;
		electricalCurrent.y = 20;
		electricalCurrent.color = "#F6F7A0";


	electricalCurrent2 = new GameObject();
		electricalCurrent2.width = 25;
		electricalCurrent2.height = 100;
		electricalCurrent2.x = canvas.width -platform1.width/2 + 100;
		electricalCurrent2.y = 40;
		electricalCurrent2.color = "#F6F7A0";

	

	var fX = .85;
	var fY = 1;
	
	var gravity = 1;

	interval = 1000/60;
	timer = setInterval(animate, interval);


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
	//bullets[b].world = level;
	bullets[b].x = player.x;
	bullets[b].y = -1000;
}








function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	


	//Moves the platform
	electricalCurrent.y += 2;
	electricalCurrent2.y += 3;

	//Bounding box for the electrical
	if (electricalCurrent.y > canvas.height - electricalCurrent.height/2)
	{
		electricalCurrent.y = 2;
	
	}

	if (electricalCurrent2.y > canvas.height - electricalCurrent2.height/2)
	{
		electricalCurrent2.y = 2;
	
	}




	if(w && player.canJump && player.vy ==0)
	{
		player.canJump = false;
		player.vy += player.jumpHeight;
		player.vy += player.ay * -player.force;
		if(!a && !d){dir.x = 0;}
		dir.y = -1;
		
	}

	if(a)
	{
		player.vx += -player.ax * player.force;
		player.vx += player.ax * -player.force;
		dir.x = -1;
		if(!w && !s){dir.y = 0;}
	}
	if(d)
	{
		player.vx += player.ax * player.force;
		player.vx += player.ax * player.force;
		dir.x = 1;
		if(!w && !s){dir.y = 0;}
	}
	

	if(space)
	{
		console.log(gravity)
		 gravity = -1
		 
		 
	}
	else{
	 	gravity =  1
	 }




	



	player.vx *= fX;
	//player.vy *= fY;
	
	player.vy += gravity;
	
	player.x += Math.round(player.vx);
	player.y += Math.round(player.vy);

	// Boundaries for the canvas
	

	if (player.y > canvas.height - player.height/2)
	{
		player.y =  canvas.height - player.height/2;
		player.vy = 0;
		
	}
	if ( player.y < player.height/2){
		player.y = player.height/2;
		player.vy = 0; 
	}
	

	//Moves player off of the screen and game over!!!

	if (player.y >= water.y)
	{
		player.x = 2000;
	}



	//Collision for the electrical current 
	while(electricalCurrent.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x = 2000;
	}

	while(electricalCurrent2.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x = 2000;
	}
//--------------------------------------------------------------------------------------

	while(platform0.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform0.hitTestPoint(player.left()) && player.vx <=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform0.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}
	
	while(platform1.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform1.hitTestPoint(player.left()) && player.vx <=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform1.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}


	// Gets the player to just rest on the level. 

	while(platform0.hitTestPoint({x:player.x + player.width/2, y:player.y/2 }) && player.vy >=0 + player.width)
	{
		player.y--;
		player.vy = -10;
		player.canJump = true;
	}
	
	while(platform1.hitTestPoint({x:player.x + player.width/2, y:player.y/2}) && player.vy >=0 + player.width)
	{
		player.y--;
		player.vy = 10;
		player.canJump = true;
	}


	for(var b = 0; b < bullets.length; b++)
	{
		//-----------------Limits the range------------------
		
		var dx = bullets[b].x - player.x //+ bullets[b].world.x - player.x;
		var dy = bullets[b].y - player.y//+ bullets[b].world.y - player.y;
		var dist = Math.sqrt(dx * dx + dy * dy);
		if(dist >= range)
		{
			bullets[b].vx = 0;
			bullets[b].y = -1000;
		}

	
		
		bullets[b].move();
		bullets[b].drawRect();
	
	}


	player.drawDebug();
	platform0.drawRect();
	platform1.drawRect();
	water.drawRect();
	electricalCurrent.drawRect();
	electricalCurrent2.drawRect();
	

	player.drawRect();

	states[currentState]();

}


function fireBullet() {

	if (fireCounter <= 0) {
		//place the bullet at the player's position minus the bullet's world
		bullets[currentBullet].x = player.x //- bullets[currentBullet].world.x;
		bullets[currentBullet].y = player.y //- bullets[currentBullet].world.y;
		//set the velocity using the dir modifier
		bullets[currentBullet].vx = dir.x * bullets[currentBullet].force;
		bullets[currentBullet].vy = dir.y * bullets[currentBullet].force;
		//reset the fireCounter
		fireCounter = fireRate;
		//increment the currentBullet index so that you can use the next bullet
		currentBullet++;
		//reset the currentBullet index when you exceed the bulletAmount
		if (currentBullet >= bulletAmount) {
			currentBullet = 0;
		}
	}
	else {
		//Allow the player to fire when click is pressed.
		fireCounter = 0;
	}
}
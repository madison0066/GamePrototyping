//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;
var counter = 0;
var targets = [];
var numTargets = 10

var dragon = new Image();
dragon.src = "dragon.png";

var waterSprite = new Image();
waterSprite.src = "water.jpg";

var fireSprite = new Image();
fireSprite.src = "fire2.png";


dragon.onload = function()
{
	animate();
}

waterSprite.onload = function()
{
	animate();
}


fireSprite.onload = function()
{
	animate();
}


//Gets the object to move


	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	canvas.addEventListener("mousemove", track);

	var interval = 1000/60;
	var timer = setInterval(animate, interval);	

	var mouse = {x:0,y:0};

	player = new GameObject({x:150});
	player.dragon = dragon;

	platform0 = new GameObject();
		platform0.width = 150;
		platform0.height = 75;
		platform0.x = platform0.width/2;
		platform0.y = 550
		
		
		platform0.color = "#0B1B91";
		
		
	
	platform1 = new GameObject();
		platform1.width = 575;
		platform1.height = 75;
		platform1.x = canvas.width -platform1.width/2;
		platform1.y = 550

	

		platform1.color = "#0B1B91";



	water = new GameObject();
		water.width = 1000;
		water.x = 500;
		water.y = 750;
		water.color = "#10C8E8";



		for(var i =0; i<numTargets; i++){
			targets[i] = new GameObject();
			targets[i].width = 25;
			targets[i].height = 100;
			targets[i].radius = 10;
			targets[i].x = randomRange(0,1000)
			targets[i].y = randomRange(0,600)
			targets[i].color = "#ADF1EA";
		}


		function drawCounter(){
		
			context.font = "30px Arial bold";
			context.fillText(counter, 120, 50);
			context.fillText("Score:", 25, 50);
			context.fillStyle = "white";
	
		}

		
		function track(e)
			{
				var rect = canvas.getBoundingClientRect();
				mouse.x = e.clientX - rect.left;
				mouse.y = e.clientY - rect.top;
			}

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
var fireCounter = 0;
var fireRate = 5;
//How far the bullet can go
var range = canvas.width;
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

function randomRange(high,low)
{
	return Math.random() * (high-low) + low;
}




function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	


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
		counter = 0;
		player.x = 150;
		player.y = 150;
		
	}


//--------------------------------------------------------------------------------------

	while(platform0.hitTestPoint(player.bottom()) || platform0.hitTestPoint(player.bottomLeft()) || platform0.hitTestPoint(player.bottomRight())&& player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform0.hitTestPoint(player.left()) && player.vy >=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform0.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}
	
	while(platform1.hitTestPoint(player.bottom()) || platform1.hitTestPoint(player.bottomLeft()) || platform1.hitTestPoint(player.bottomRight()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
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

	
		bullets[b].height = 50;
		bullets[b].width = 50;
		bullets[b].move();
		//bullets[b].drawRect();
		bullets[b].drawFire();
	
	}


	//Moving Targets
	
	for(var i =0; i<targets.length; i++){
		targets[i].y += 3;

		targets[i].drawCircle()
		//console.log(targets[i])
		if(targets[i].y > canvas.height)
		{
			targets[i].y = randomRange(0,-245);
		}

	}
	for(var i =0; i<targets.length; i++)
	{
		for(var b =0; b<targets.length; b++)
			{
				if(targets[i].hitTestObject(bullets[b]))
				{
					counter++;
					targets[i].y = randomRange(0,-245);
					//platform0.y = randomRange(100,600)
					platform1.y = randomRange(100,600);
					platform1.x = randomRange(100,600)
					
				}
				if(platform0.hitTestObject(player) && targets[i].hitTestObject(bullets[b]))
				{
					counter += 2;
					targets[i].y = randomRange(0,-245);
					//platform0.y = randomRange(100,600)
					platform1.y = randomRange(100,600);
					platform1.x = randomRange(100,600)
					
				}
			}
	}


	//player.drawDebug();
	platform0.drawRect();
	platform1.drawRect();
	//water.drawRect();

	

	//player.drawRect();
	player.drawPlayer();

	water.drawWater()

	drawCounter();

}


function fireBullet() {

	if (fireCounter <= 0) {
		
		var dx = mouse.x - player.x;
		var dy = mouse.y - player.y;

	
		var radians = Math.atan2(dy, dx);

		bullets[currentBullet].vx = Math.cos(radians)*bullets[currentBullet].force;
		bullets[currentBullet].vy = Math.sin(radians)*bullets[currentBullet].force;

		bullets[currentBullet].x = player.x 
		bullets[currentBullet].y = player.y 
		//set the velocity using the dir modifier
		//bullets[currentBullet].vx = dir.x * bullets[currentBullet].force;
		//bullets[currentBullet].vy = dir.y * bullets[currentBullet].force;
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
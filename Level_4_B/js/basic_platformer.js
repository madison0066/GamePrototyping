//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;


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
		
	
	//goal = new GameObject({width:24, height:50, x:platform1.x + 100, y:platform1.y-100, color:"#00ffff"});
	

	var fX = .85;
	var fY = 1;
	
	var gravity = 1;

	interval = 1000/60;
	timer = setInterval(animate, interval);

function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	

	if(w && player.canJump && player.vy ==0)
	{
		player.canJump = false;
		player.vy += player.jumpHeight;
		
		
	}

	if(a)
	{
		player.vx += -player.ax * player.force;
	}
	if(d)
	{
		player.vx += player.ax * player.force;
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


	player.drawDebug();
	platform0.drawRect();
	platform1.drawRect();

	player.drawRect();

}


//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;
var hazards = new Array();
var items = new Array();
var counter = 0;

var swapping;




	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	player = new GameObject({x:150});
		player.x = canvas.width/2;
		player.y = canvas.height - player.height/2;
		player.width = 50;
		player.height = 50;
		player.color = "#ffff00";


	var fX = .85;
	var fY = 1;
	
	var gravity = 1;

	interval = 1000/60;
	timer = setInterval(animate, interval);


	function randomRange(high, low){
		return Math.random() * (high-low) + low
	}




	for(var i =0; i<5; i++){
		hazards[i] = new GameObject()		
		hazards[i].x = randomRange(20,700)
		hazards[i].y = randomRange(200,-245) ;
		hazards[i].color = "#FF0000";	
		
	}	


	for(var i =0; i<5; i++){
		items[i] = new GameObject()		
		items[i].x = randomRange(20,700)
		items[i].y = randomRange(200,-245) ;
		items[i].color = "#CBC3E3";	
		items[i].width = 25;
		items[i].height = 25;
		
	}
	

	function drawCounter(){
		
		context.font = "30px Arial bold";
		context.fillText(counter, 120, 50);
		context.fillText("Score:", 25, 50);
		context.fillStyle = "white";

	}
	


function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	

	if(w && player.canJump && player.vy ==0)
	{
		player.vy += player.ay * -player.force;

	}

	if(a)
	{
		player.vx += -player.ax * player.force;
		player.vx += player.ax * -player.force;
	
	}
	if(d)
	{
		player.vx += player.ax * player.force;
		player.vx += player.ax * player.force;

	}
	

	player.vx *= fX;
	//player.vy *= fY;
	

	
	player.x += Math.round(player.vx);
	player.y += Math.round(player.vy);

	// Boundaries for the canvas
	

	if (player.x > canvas.width - player.width)
	{
		player.x =  canvas.width - player.width;
		player.vx= 0;
		
	}
	if ( player.x < player.width){
		player.x = player.width;
		player.vx = 0; 
	}



	for(var i =0; i<5; i++){
		hazards[i].drawCircle()
		hazards[i].y += 3;

		if(hazards[i].y > canvas.height)
		{
			hazards[i].y = randomRange(200,-245);
		}
	}



	for(var i =0; i<5; i++){
		items[i].drawRect()
		items[i].y += 3;

		if(items[i].y > canvas.height)
		{
			items[i].y = randomRange(200,-245);
		}	
		

	}

	for(var i =0; i<5; i++){
		if (items[i].hitTestObject(player)){
			counter ++;
			items[i].y = randomRange(200,-245);
			player.color = "#00FF00"
			setTimeout(colorChange, 500);
			
		}
	}

	for(var i =0; i<5; i++){
		if (hazards[i].hitTestObject(player)){
			counter ++;
			hazards[i].y = randomRange(200,-245);
			player.color = "#FF0000"
			setTimeout(colorChange, 500);
			counter = 0;
			
		}
	}
	
	player.drawDebug();
	player.drawRect();
	drawCounter()


}

function colorChange()
{
	player.color = "#ffff00";

}
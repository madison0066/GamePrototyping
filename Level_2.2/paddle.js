// JavaScript Document

var canvas;
var context;
var timer;
var interval = 1000/60;
var player;
var frictionX = .75;	
var frictionY = .75;
var gravity = 1;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	
	


player = new GameObject();


player.x = player.width/2 +25;
	player.force = 2;
	
	timer = setInterval(animate, interval);

/*
function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	


	player.drawRect();
	player.move();

}
*/



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

player2 = new GameObject();


player.x = 0;
player.width = 25
player.height = 200
player.force = 2;
player.color = "purple"


player2.x = 1020;
player2.width = 25
player2.height = 200
player2.force = 2;
player2.color = "blue"




	
	timer = setInterval(animate, interval);





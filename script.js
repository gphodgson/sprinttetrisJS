var placed_blocks = [];
var drop_speed = 10;
var HMR = 5;
var drop_timer = 0;
var horizontal_timer = 0

var score = 0;
var lines = 0;




function create_ghost_tet(tet) {
	ghost_tet = new Tetromino(tet.tetromino, "", placed_blocks, true, ghost_img)
	ghost_tet.blocks.splice(0,4)
	ghost_tet.setposX(tet.pos.x)
	ghost_tet.hard_drop();
	

	return ghost_tet;
}

function create_next_tetromino() {
	next_tet = create_tetromino();
	next_tet.setposX(480)
	next_tet.setposY(100);

	return next_tet;
}



function create_tetromino(pieces) {
	r = random(1,7);
	r = Math.round(r);
	var tet;

	if(r == 7 ){
		tet = new Tetromino(Pieces.Iblock(0), "lpiece", placed_blocks, false, Iblock_img);
	}else if (r == 6){
		tet = new Tetromino(Pieces.Lblock(0), "lpiece", placed_blocks, false, Lblock_img);
	}else if (r == 5){
		tet = new Tetromino(Pieces.Jblock(0), "lpiece", placed_blocks, false, Jblock_img);
	}else if (r == 4){
		tet = new Tetromino(Pieces.Oblock(0), "lpiece", placed_blocks, false, Oblock_img);
	}else if (r == 3){
		tet = new Tetromino(Pieces.Tblock(0), "lpiece", placed_blocks, false, Tblock_img);
	}else if (r == 2){
		tet = new Tetromino(Pieces.Sblock(0), "lpiece", placed_blocks, false, Sblock_img);
	}else if (r == 1){
		tet = new Tetromino(Pieces.Zblock(0), "lpiece", placed_blocks, false, Zblock_img);
	}else{
		tet = new Tetromino(Pieces.Zblock(0), "lpiece", placed_blocks, false, Zblock_img);
	}

	return tet;
}

function draw_grid() {
	for(x=200; x<420; x+=20){
		noStroke();
		fill(150);
		rect(x, 0, 1, height);
	}
	for(y=0; y<width; y+=20){
		noStroke();
		fill(150);
		rect(200, y, 220, 1);
	}


}

function draw_borders() {
	fill(0,0,255)

	stroke(0)
	strokeWeight(2)

	// rect(200,0,20,height);
	// rect(420,0,20,height);

	image(border_img,200,0)
	image(border_img,420,0)

	rect(480,100,120,3)
	rect(480,100,3,100)
	rect(480,200,120,3)
	rect(597,100,3,100)
}

function preload() {
	try{
		block_img = loadImage('assets/block_img.png')
		Iblock_img = loadImage('assets/Iblock_img.png')
		Tblock_img = loadImage('assets/Tblock_img.png')
		Oblock_img = loadImage('assets/Oblock_img.png')
		Lblock_img = loadImage('assets/Lblock_img.png')
		Jblock_img = loadImage('assets/Jblock_img.png')
		Sblock_img = loadImage('assets/Sblock_img.png')
		Zblock_img = loadImage('assets/Zblock_img.png')
		ghost_img = loadImage('assets/ghost_img.png')

		border_img = loadImage('assets/border.png')
	}catch(err){
		console.log(err)
	}
}


function setup() {

	//Creates Canvas, Including Resolution
	createCanvas(640, 480);

	frameRate(60);

	Pieces = new Pieces();

	r = random(1,1000000000)

	randomSeed(r);

	tet = create_tetromino();
	next_tet = create_next_tetromino();

	ghost_tet = create_ghost_tet(tet);
}

function draw() {
	//DRAW FUNCTION REPEATS EVREY FRAME!!
	//Resets frame
	background(51);
	// draw_grid();

	if (keyIsDown(DOWN_ARROW)){
		drop_speed = 2;
	}else{
		drop_speed = 30;
	}


	if (frameCount % drop_speed == 0 && !tet.isPlaced){
		tet.update();

		ghost_tet = create_ghost_tet(tet)

	}

	if (horizontal_timer > 2){
		if (keyIsDown(LEFT_ARROW)){

			tet.shift('left');
			drop_timer = 0;
			if (!tet.check_blocked()){
				tet.setPlaced(false);
			}

			ghost_tet = create_ghost_tet(tet)

		}else if (keyIsDown(RIGHT_ARROW)){

			tet.shift('right');
			drop_timer = 0;

			if (!tet.check_blocked()){
				tet.setPlaced(false);
			}

			ghost_tet = create_ghost_tet(tet)
		}
		horizontal_timer = 0;
	}else{
		horizontal_timer++
	}

	if (tet.isPlaced){

		if (drop_timer >= 15){

			for(i=0; i < tet.blocks.length; i++){
				tet.blocks[i].setPlaced(true);

				placed_blocks.push(tet.blocks[i]);
			}

			tet = new Tetromino(next_tet.tetromino, "", placed_blocks, false, next_tet.img)

			next_tet = create_next_tetromino();

			drop_timer = 0;
		}else{
			drop_timer++;
		}
	}

	ghost_tet.draw();

	next_tet.draw();
	tet.draw()
	draw_borders();
	
	textSize(20)

	text("Version: 0.4 Alpha",0,20)
	text("fps: "+ round(frameRate()),0,40)

	text("Score: " + score, 480, 250)
	text("Lines: " + lines, 480, 270)

	for (i = 0; i < placed_blocks.length; i++){
		placed_blocks[i].draw();
	}

	combo = 0
	for (x = 1; x <= 16; x++){
		row = x*20;
		count = 0;

		// console.log(row)

		for (i = 0; i < placed_blocks.length; i++) {
			if (500 - placed_blocks[i].true_pos.y == row){
				count++
				
			}
		}
		if (count >= 10){
			lines++
			combo++
			for (var i = placed_blocks.length - 1; i >= 0; i--) {
				if ( 500 - placed_blocks[i].true_pos.y == row){
					placed_blocks.splice(i, 1);
				}
			}

			for (var i = placed_blocks.length - 1; i >= 0; i--) {
				if (500-placed_blocks[i].true_pos.y > row){
					placed_blocks[i].force_update()
				}
				
			}
		}
	}

	if (combo == 1){
		score += 200;
	}else if (combo == 2){
		score += 300
	}else if (combo == 3){
		score += 500
	}else if (combo == 4){
		score += 800
	}

	

}
function keyPressed() {
	if (keyCode == UP_ARROW){
		tet.rotate('cw');
		ghost_tet = create_ghost_tet(tet);
	}

	if (keyCode == 88){
		tet.rotate('cw')
		ghost_tet = create_ghost_tet(tet);
	}else if (keyCode == 90){
		tet.rotate('ccw')
		ghost_tet = create_ghost_tet(tet);
	}

	if (keyCode == 32){
		drop_timer = 15;
		tet.hard_drop();
	}

	if (keyCode == DOWN_ARROW){
		drop_speed = 5;
	}
}
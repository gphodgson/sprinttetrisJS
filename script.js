
function drawBoundingBox() {
	fill(0,0,255)
	strokeWeight(5)
	rect(400,0,40,height)
	rect(840,0,40,height)
}


function preload() {
	block_img = loadImage('assets/block_img.png')
	Iblock_img = loadImage('assets/Iblock_img.png')
	Tblock_img = loadImage('assets/Tblock_img.png')
	Oblock_img = loadImage('assets/Oblock_img.png')
	Lblock_img = loadImage('assets/Lblock_img.png')
	Jblock_img = loadImage('assets/Jblock_img.png')
	Sblock_img = loadImage('assets/Sblock_img.png')
	Zblock_img = loadImage('assets/Zblock_img.png')
	ghost_img = loadImage('assets/ghost_img.png')
	explosion_img = loadImage('assets/explosion.png')

	//list of block images
	blockImgs = [Iblock_img, Tblock_img, Oblock_img, Lblock_img, Jblock_img, Sblock_img, Zblock_img]

	//list of tetromino metadata
	tetrominos = [];

	tetrominos.push(Pieces.Iblock(0));
	tetrominos.push(Pieces.Oblock(0));
	tetrominos.push(Pieces.Tblock(0));
	tetrominos.push(Pieces.Lblock(0));
	tetrominos.push(Pieces.Jblock(0));
	tetrominos.push(Pieces.Sblock(0));
	tetrominos.push(Pieces.Zblock(0));
}

function getTimeString(milli) {
	total_seconds = milli / 1000

	minutes = Math.floor(total_seconds/60)

	seconds = Math.floor(((total_seconds/60) - minutes) * 60)

	return minutes + ":" + seconds +":00"
}

function updateGhost() {
	for (var i = 0; i < fallingBlocks.length; i++) {
		ghostBlocks[i].x = fallingBlocks[i].x;
		ghostBlocks[i].y = fallingBlocks[i].y;
	}
}

function newTetromino(){
	// nextTetromino.setPos(width/2-120, -120);
	tetromino = new Tetromino(width/2-120, -120, nextTetromino.tetromino, ghost_img, globalPlacedBlocks);
	nextTetromino = new Tetromino(1000, 400, random(tetrominos), ghost_img, globalPlacedBlocks);
	// nextTetromino.setPos(1000,400);
	ghostTetromino = new Tetromino(tetromino.x, tetromino.y, tetromino.tetromino, ghost_img, globalPlacedBlocks);
}

function holdTetromino() {

	var turninto = heldTetromino.tetromino;


	heldTetromino = new Tetromino(80, 400, tetromino.tetromino, ghost_img, globalPlacedBlocks);

	tetromino = new Tetromino(width/2-120, -120, turninto, ghost_img, globalPlacedBlocks);
	ghostTetromino = new Tetromino(tetromino.x, tetromino.y, tetromino.tetromino, ghost_img, globalPlacedBlocks);

	held = true;


}

function setup() {
	//Creates Canvas, Including Resolution
	createCanvas(1280, 800);
	//Sets game FrameRate Cap
	frameRate(600);

	//list of all placed blocks in the game.
	globalPlacedBlocks = [];

	//list of falling blocks
	fallingBlocks = [];
	//if true, dump all falling blocks into globalPlacedBlocks
	dumpFallingBlocks = false;

	//list of ghost Blocks
	ghostBlocks = [];

	//list of decals
	decals = [];

	// fallingBlocks.push(new Block(width/2, 0, random(blockImgs), ghost_img, globalPlacedBlocks));

	// newTetromino();

	tetromino = new Tetromino(width/2-120, -120, random(tetrominos), ghost_img, globalPlacedBlocks);
	ghostTetromino = new Tetromino(tetromino.x, tetromino.y, tetromino.tetromino, ghost_img, globalPlacedBlocks);
	nextTetromino = new Tetromino(1000,400, random(tetrominos), ghost_img, globalPlacedBlocks);
	heldTetromino = new Tetromino(80,400, random(tetrominos), ghost_img, globalPlacedBlocks);

	held = false;

	fallingBlockTimer = 0;
	fallingBlockRate = 500;

	movementTimer = 0;
	movementRate = 5;

	lines = 0;
	score = 0;
	level = 1;

}


function gameLogic() {

	fallingBlocks = tetromino.blocks;
	ghostBlocks = ghostTetromino.blocks;
	updateGhost();


	if (millis() - fallingBlockTimer >= fallingBlockRate){
		for (var i = 0; i < fallingBlocks.length; i++) {
			fallingBlocks[i].update();

		}
		tetromino.update('down');
		fallingBlockTimer = millis();
	}

	if (keyIsDown(LEFT_ARROW)){

		if(movementTimer > movementRate){
			var blocked = false;

			for (var i = 0; i < fallingBlocks.length; i++) {
				if (fallingBlocks[i].isBlockedLeft()){
					blocked = true;
					break;
				}
			}
			if(!blocked){
				for (var i = 0; i < fallingBlocks.length; i++) {
					fallingBlocks[i].shift('left');

				}
				tetromino.update('left');
				updateGhost();
			}
			movementTimer = 0;
		}
		else{
			movementTimer++;
		}


	}

	if (keyIsDown(RIGHT_ARROW)){
		if(movementTimer > movementRate){
			var blocked = false;

			for (var i = 0; i < fallingBlocks.length; i++) {
				if (fallingBlocks[i].isBlockedRight()){
					blocked = true;
					break;
				}
			}
			if(!blocked){
				for (var i = 0; i < fallingBlocks.length; i++) {
					fallingBlocks[i].shift('right');

				}
				tetromino.update('right');
				updateGhost();
			}
			movementTimer = 0;
		}
		else{
			movementTimer++;
		}

	}


	if(keyIsDown(DOWN_ARROW)){
		fallingBlockRate = 50;
	}else{
		fallingBlockRate = 1000;
	}

	var quit = false;
	while(!quit){

		// console.log('debug')

		for (var i = 0; i < ghostBlocks.length; i++) {
			if (ghostBlocks[i].isBlockedDownward()){
				quit = true;
			}
		}
		if(!quit){
			for (var i = 0; i < ghostBlocks.length; i++) {
				ghostBlocks[i].y += 40;
			}
		}
	}

	for (var i = 0; i < fallingBlocks.length; i++) {
		fallingBlocks[i].draw(fallingBlocks[i].img);

		if (fallingBlocks[i].isBlockedDownward()){
			dumpFallingBlocks = true;
		}
	}

	if(dumpFallingBlocks){
		for (var i = 0; i < fallingBlocks.length; i++) {
			globalPlacedBlocks.push(fallingBlocks[i]);
		}

		newTetromino();

		// fallingBlocks.push(new Block(width/2, 0, random(blockImgs), ghost_img,  globalPlacedBlocks));

		dumpFallingBlocks = false;
	}

	var combo = 0;

	for (x = 1; x <= 20; x++){
		row = x*40;
		count = 0;


		for (i = 0; i < globalPlacedBlocks.length; i++) {
			if (800 - globalPlacedBlocks[i].y == row){
				count++
			}
		}
		if (count >= 10){
			lines++
			combo++
			for (var i = globalPlacedBlocks.length - 1; i >= 0; i--) {
				if ( 800 - globalPlacedBlocks[i].y == row){
					decals.push(new Decal(globalPlacedBlocks[i].x - 20, globalPlacedBlocks[i].y - 20, explosion_img, 100))
					globalPlacedBlocks.splice(i, 1);
				}
			}

			for (var i = globalPlacedBlocks.length - 1; i >= 0; i--) {
				if (800-globalPlacedBlocks[i].y > row){
					globalPlacedBlocks[i].forceUpdate();
				}

			}
		}
	}

	score += combo * 200;

}

function draw() {
	//DRAW FUNCTION REPEATS EVREY FRAME!!
	//Resets frame
	background(51);

	//Run Game Logic
	gameLogic();

	// tetromino.ghostDraw();



	for (var i = 0; i < globalPlacedBlocks.length; i++) {
		globalPlacedBlocks[i].draw(globalPlacedBlocks[i].img);
	}

	for (var i = 0; i < ghostBlocks.length; i++) {
		ghostBlocks[i].draw(ghost_img);
	}

	// nextTetromino.draw();
	for (var i = 0; i < nextTetromino.blocks.length; i++) {
		nextTetromino.blocks[i].draw(nextTetromino.tetromino[4]);
	}

	if(held){
		for (var i = 0; i < heldTetromino.blocks.length; i++) {
			heldTetromino.blocks[i].draw(heldTetromino.tetromino[4]);
		}
	}

	// console.log(nextTetromino.x + " " +nextTetromino.y)

	if(decals != []){
		for (var i = decals.length-1; i >= 0; i--) {
			console.log(i)
			decals[i].draw();

			if (decals[i].delete){

				decals.splice(i, 1)
			}
		}
	}

	drawBoundingBox();

	textSize(40)

	text("Version: 0.2 Alpha",0,40)
	text("fps: "+ round(frameRate()),0,80)
	text("milli: "+ round(millis()),0,120)
	text("movementTimer: "+ movementTimer,0,160)

	text("Lines: " + lines, 1000, 80)
	text("Score: " + score, 1000, 120)


	text("Held:", 80, 360);
	text("Next:", 1000, 360);

	// text("Time: " + getTimeString(millis()) , 480, 350)

}

function keyPressed() {
	if (keyCode == LEFT_ARROW){
		var blocked = false;

		for (var i = 0; i < fallingBlocks.length; i++) {
			if (fallingBlocks[i].isBlockedLeft()){
				blocked = true;
				break;
			}
		}
		if(!blocked){
			for (var i = 0; i < fallingBlocks.length; i++) {
				fallingBlocks[i].shift('left');

			}
			tetromino.update('left');
			updateGhost();
		}

	}

	if (keyCode == RIGHT_ARROW){
		var blocked = false;

		for (var i = 0; i < fallingBlocks.length; i++) {
			if (fallingBlocks[i].isBlockedRight()){
				blocked = true;
				break;
			}
		}
		if(!blocked){
			for (var i = 0; i < fallingBlocks.length; i++) {
				fallingBlocks[i].shift('right');

			}
			tetromino.update('right');
			updateGhost();
		}
	}

	if(keyCode == UP_ARROW){
		if(!tetromino.isBlockedRotateCW()){
			tetromino.rotate('cw');
		}
		fallingBlocks = tetromino.blocks;
		updateGhost();
	}

	//space
	if (keyCode == 32){
		var quit = false;
		while(!quit){

			for (var i = 0; i < fallingBlocks.length; i++) {
				if (fallingBlocks[i].isBlockedDownward()){
					quit = true;
				}
			}
			if(!quit){
				for (var i = 0; i < fallingBlocks.length; i++) {
					fallingBlocks[i].y += 40;
				}
			}
		}
	}

	//'r' key
	if(keyCode == 82){
		globalPlacedBlocks = [];
		fallingBlocks = [];

		newTetromino();
	}

	if(keyCode == 67){
		holdTetromino()
	}

	//'z' key

	if(keyCode == 90){
		if(!tetromino.isBlockedRotateCW()){
			tetromino.rotate('ccw');
		}
		fallingBlocks = tetromino.blocks;
		updateGhost();
	}

	//'x'key
	if(keyCode == 88){
		if(!tetromino.isBlockedRotateCW()){
			tetromino.rotate('cw');
		}
		fallingBlocks = tetromino.blocks;
		updateGhost();
	}
}

function keyTyped() {

}

function Tetromino(tetromino, tetromino_string, placed_blocks, isGhost, img) {
	this.blocks = [];

	this.pos = createVector(width/2, -60);

	this.isPlaced = false;

	this.rotation = 0;

	this.placed_blocks = placed_blocks;

	this.img = img;

	this.tetromino = tetromino;
	if (!isGhost){
		this.color = tetromino[4];
	}else{
		this.color = [150,150,150]
	}

	for(y=0; y<4; y++){

		for(x=0; x<tetromino[y].length; x++){

			if (tetromino[y].charAt(x) == "O"){

				this.blocks.push(new Block(this.pos.x + ((x+1)*20), this.pos.y + ((y+1)*20),  this.color, placed_blocks, false, this.img));

			}
		}
	}

	this.reset = function() {
		for(y=0; y<4; y++){

			for(x=0; x<this.tetromino[y].length; x++){

				if (this.tetromino[y].charAt(x) == "O"){

					this.blocks.push(new Block(this.pos.x + ((x+1)*20), this.pos.y + ((y+1)*20),  this.color, placed_blocks, false, this.img));

				}
			}
		}

	}

	this.hard_drop = function() {
		var stop = false

		while(!stop){

			// console.log("debug")

			this.update();

			for(i=0; i<this.blocks.length; i++){
				for(x=0; x<this.placed_blocks.length; x++){
					if (this.blocks[i].true_pos.y+20 == this.placed_blocks[x].true_pos.y  && this.blocks[i].true_pos.x == this.placed_blocks[x].true_pos.x){
						stop = true
					}
				}

				if (this.blocks[i].true_pos.y + 20 >= height){
						stop = true
				}
				
			}
		}
	}

	this.check_blocked = function() {
		for(i=0; i<this.blocks.length; i++){
			for(x=0; x<this.placed_blocks.length; x++){
				if (this.blocks[i].true_pos.y+20 == this.placed_blocks[x].true_pos.y  && this.blocks[i].true_pos.x == this.placed_blocks[x].true_pos.x){
					return true;
				}
			}

			if (this.blocks[i].true_pos.y + 20 >= height){
					return true;
			}
			
		}

		return false;
	}

	this.attempt_rotate = function(dir) {
		this.rotate(dir)

		inGoodPlace = false
		cantRotate = false

		while(!inGoodPlace){
			inGoodPlace = true

			for (var y = this.placed_blocks.length - 1; y >= 0; y--) {
				for (var x = this.blocks.length - 1; x >= 0; x--) {
					if (this.blocks[x].true_pos.x == this.placed_blocks[y].true_pos.x && this.blocks[x].true_pos.x == this.placed_blocks[y].true_pos.x){
						this.force_shift('right')
						if (this.blocks[x].true_pos.x == this.placed_blocks[y].true_pos.x && this.blocks[x].true_pos.x == this.placed_blocks[y].true_pos.x){
							this.force_shift('left')
							this.force_shift('left')
							if (this.blocks[x].true_pos.x == this.placed_blocks[y].true_pos.x && this.blocks[x].true_pos.x == this.placed_blocks[y].true_pos.x){
								cantRotate = true
							}
						}
						
					}
					if (this.blocks[y].x <= 200){
						this.force_shift('right')
						inGoodPlace = false
					}
					if (this.blocks[y].x <= 420){
						this.force_shift('left')
						inGoodPlace = false
					}

					if(cantRotate){
						if (dir == 'cw'){
							this.rotate('ccw')
						}else{
							this.rotate('cw')
						}
						inGoodPlace=true
					}
				}

			}
		}

	}

	this.force_shift = function(dir) {
		if (dir == 'left'){
			for (i=0; i<this.blocks.length; i++){
				this.blocks[i].shift('left');
			}
			this.pos.x -= 20;

		}else if (dir == 'right'){
			for (i=0; i<this.blocks.length; i++){
				this.blocks[i].shift('right');
			}
			this.pos.x += 20;
		}
	}

	this.shift = function(dir) {
		blocked_left = false
		blocked_right = false

		// this.blocks[0].left_blocked

		for (i=0; i<this.blocks.length; i++){
			if(this.blocks[i].blocked_left){
				blocked_left = true;
			}
			if (this.blocks[i].blocked_right){
				blocked_right = true;
			}
		}

		if (!blocked_left && dir == 'left'){
			for (i=0; i<this.blocks.length; i++){
				this.blocks[i].shift('left');
			}
			this.pos.x -= 20;

		}else if (!blocked_right && dir == 'right'){
			for (i=0; i<this.blocks.length; i++){
				this.blocks[i].shift('right');
			}
			this.pos.x += 20;
		}

	}


	this.rotate = function(dir) {
		if (dir == 'cw'){
			this.rotation++;
		}else if (dir == 'ccw'){
			this.rotation--;
		}

		if (this.rotation > 3){
			this.rotation = 0;
		}else if (this.rotation < 0){
			this.rotation = 3;
		}

		for (var i = this.blocks.length - 1; i >= 0; i--) {
			this.blocks.pop(i);
		}


		if (this.tetromino[5] == 7){
			this.tetromino = Pieces.Iblock(this.rotation)
		}else if (this.tetromino[5] == 6){
			this.tetromino = Pieces.Oblock(this.rotation)
		}else if (this.tetromino[5] == 5){
			this.tetromino = Pieces.Tblock(this.rotation)
		}else if (this.tetromino[5] == 4){
			this.tetromino = Pieces.Lblock(this.rotation)
		}else if (this.tetromino[5] == 3){
			this.tetromino = Pieces.Jblock(this.rotation)
		}else if (this.tetromino[5] == 2){
			this.tetromino = Pieces.Sblock(this.rotation)
		}else if (this.tetromino[5] == 1){
			this.tetromino = Pieces.Zblock(this.rotation)
		}

		this.reset()

		for (var i = this.blocks.length - 1; i >= 0; i--) {
			if (this.blocks[i].true_pos.x <= 200 || this.blocks[i].true_pos.x >= 420){
				if(this.blocks[i].true_pos.x <= 200){
					this.blocked_left = true
				}else if(this.blocks[i].true_pos.x >= 420){
					this.blocked_right
				}
				if(dir == 'cw'){
					this.rotate('ccw')
				}else{
					this.rotate('cw')
				}
			}
		}
	}








	this.draw = function() {
		for (i=0; i<this.blocks.length; i++){
			this.blocks[i].draw();
		}
	}

	this.update = function(){

		for (i=0; i<this.blocks.length; i++){
			this.blocks[i].update();
		}
		this.pos.y += 20

		for (i=0; i<this.blocks.length; i++){
			if(this.blocks[i].placed){
				this.isPlaced = true;
			}
		}
	}

	this.setPlaced = function(x) {
		this.isPlaced = x;

		for (i=0; i<this.blocks.length; i++){
			this.blocks[i].setPlaced(x);

		}
	}

	this.setposX = function(x) {
		this.pos.x = x

		this.reset();
	}

	this.setposY = function(x) {
		this.pos.y = x

		this.reset();
	}

	this.setPos = function(x,y) {
		this.pos.x = x;
		this.pos.y = y;

		this.reset()
	}
}
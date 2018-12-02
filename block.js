function Block(true_x, true_y, color, placed_blocks, isPlaced, img) {
	this.true_pos = createVector(true_x,true_y);
	this.img = img

	this.dimensions = 20;

	this.color = color;

	if (isPlaced){
		this.placed = true;
	}else{
		this.placed = false;
	}

	this.placed_blocks = placed_blocks;



	this.update = function() {
		if (!this.placed){
			this.true_pos.y += 20;
		}

		if (this.true_pos.y + 20 >= height){
			this.placed = true;
		}


		for(x=0; x<this.placed_blocks.length;x++){
			if(this.true_pos.y+20 == this.placed_blocks[x].true_pos.y && this.true_pos.x == this.placed_blocks[x].true_pos.x){
				this.placed = true;
			}
		}

	}

	this.force_update = function() {
		this.true_pos.y += 20;
	}

	this.draw = function() {
		// strokeWeight(2);
		// stroke(0);
		// fill(this.color[0], this.color[1], this.color[2]);
		// rect(this.true_pos.x, this.true_pos.y, this.dimensions, this.dimensions);

		image(this.img, this.true_pos.x, this.true_pos.y)
	}



	this.shift = function(dir) {

		this.blocked_right = false;
		this.blocked_left = false;

		if (dir == 'left' && this.true_pos.x+20 <= width && !this.blocked_left){
			this.true_pos.x -= 20;
		}else if (dir == 'right' && this.true_pos.x-20 >= 0 && !this.blocked_right){
			this.true_pos.x += 20;
		}


		for (x=0; x<this.placed_blocks.length; x++){
			if (this.true_pos.x+20 == this.placed_blocks[x].true_pos.x && this.true_pos.y == this.placed_blocks[x].true_pos.y){
				this.blocked_right = true;
			}
			if (this.true_pos.x-20 == this.placed_blocks[x].true_pos.x && this.true_pos.y == this.placed_blocks[x].true_pos.y){
				this.blocked_left = true;
			}

			if (this.true_pos.x+20 == 420){
				this.blocked_right = true
			}
			if (this.true_pos.x-20 == 200){
				this.blocked_left = true
			}

		}
	}

	this.setPlaced = function(x) {
		this.placed = x;
	}
}
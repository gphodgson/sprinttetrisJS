//represents a collection of Blocks, that make up a tetromino

//param x: the starting X position of the tetromino
//param y: the starting Y position of the tetromino
//param tetromino: the meta data of the tetromino, aquiried from the Pieces class.

function Tetromino(x, y, tetromino, ghostImg, globalPlacedBlocks) {
    this.x = x;
    this.y = y;

    this.tetromino = tetromino;

    this.ghostImg = ghostImg

    this.globalPlacedBlocks = globalPlacedBlocks;

    this.rotation = 0;

    //this function will reset the the tertromino, aka build it based upon the current  x, and y values.
    this.generateBlocks = function() {
        var blocks = [];
        for(y=0; y<4; y++){
    		for(x=0; x<this.tetromino[y].length; x++){
    			if (this.tetromino[y].charAt(x) == "O"){
    				blocks.push(new Block(this.x + ((x+1)*40), this.y + ((y+1)*40), this.tetromino[4], this.ghostImg, this.globalPlacedBlocks));
    			}
    		}
    	}

        return blocks;
    }


    this.blocks = this.generateBlocks();

    this.update = function (dir) {
        if(dir == 'down'){
            this.y += 40;
        }else if(dir == 'right'){
            this.x += 40;
        }else if(dir == 'left'){
            this.x -= 40;
        }
    }



    this.rotate = function(dir) {

        if(dir == 'cw'){
            this.rotation++;

            if(this.rotation > 3){
                this.rotation = 0;
            }
        }else if(dir == 'ccw'){
            this.rotation--;

            if(this.rotation < 0){
                this.rotation = 3;
            }
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

        this.blocks = this.generateBlocks();
    }

    this.isBlockedRotateCW = function() {
        var blocked = false;
        this.rotate('cw')

        for (var i = 0; i < this.blocks.length; i++) {
            for (var x = 0; x < this.globalPlacedBlocks.length; x++) {
                if(this.globalPlacedBlocks[x].x == this.blocks[i].x && this.globalPlacedBlocks[x].y == this.blocks[i].y){
                    blocked = true;
                }
            }

            if(this.blocks[i].x > 800 || this.blocks[i].x < 440){
                blocked = true;
            }
        }

        this.rotate('ccw')
        return blocked;
    }

    this.isBlockedRotateCW = function() {
        var blocked = false;
        this.rotate('ccw')

        for (var i = 0; i < this.blocks.length; i++) {
            for (var x = 0; x < this.globalPlacedBlocks.length; x++) {
                if(this.globalPlacedBlocks[x].x == this.blocks[i].x && this.globalPlacedBlocks[x].y == this.blocks[i].y){
                    blocked = true;
                }
            }

            if(this.blocks[i].x > 800 || this.blocks[i].x < 440){
                blocked = true;
            }
        }

        this.rotate('cw')
        return blocked;
    }

    this.setPos = function(x, y) {
        this.x = x;
        this.y = y;
    }

    //only use this if the blocks wont move
    this.draw = function() {
        for (var i = 0; i < this.blocks.length; i++) {
            image(this.tetromino[4], this.x, this.y)
        }
    }
}


//Block: Represents a single block on a tetromino
//Param x: the starting X position of the block
//Param y: the starting Y position of the block
//Param img: the image that will reprsent the block

function Block(x, y, img, ghostImg, globalPlacedBlocks) {
    this.x = x;
    this.y = y;

    this.width = 40;
    this.height = 40;

    this.img = img;

    this.globalPlacedBlocks = globalPlacedBlocks;

    // this.ghostX = 0;
    // this.ghostY = 0;
    // this.ghostImg = ghostImg;
    // this.placed = false;

    this.isBlockedDownward = function() {
        var blocked = false;

        if ((this.y + 80) > height){
            blocked = true;
        }

        for (var i = 0; i < this.globalPlacedBlocks.length; i++) {
            if (this.y + 40 == this.globalPlacedBlocks[i].y && this.x == this.globalPlacedBlocks[i].x){
                blocked = true;
            }
        }

        return blocked;
    }

    this.ghostIsBlockedDownward = function() {
        var blocked = false;

        if ((this.ghostY + 41) > height){
            blocked = true;
        }

        for (var i = 0; i < this.globalPlacedBlocks.length; i++) {
            if (this.ghostY + 40 == this.globalPlacedBlocks[i].y && this.ghostX == this.globalPlacedBlocks[i].x){
                blocked = true;
            }
        }

        return blocked;
    }

    this.isBlockedLeft = function(){
        var blocked = false;

        if ((this.x - 40) < 440){
            blocked = true;
        }

        for (var i = 0; i < this.globalPlacedBlocks.length; i++) {
            if (this.x - 40 == this.globalPlacedBlocks[i].x && this.y == this.globalPlacedBlocks[i].y){
                blocked = true;
            }
        }

        return blocked;
    }

    this.isBlockedRight = function(){
        var blocked = false;

        if ((this.x + 40) > 800){
            blocked = true;
        }

        for (var i = 0; i < this.globalPlacedBlocks.length; i++) {
            if (this.x + 40 == this.globalPlacedBlocks[i].x && this.y == this.globalPlacedBlocks[i].y){
                blocked = true;
            }
        }

        return blocked;
    }


    this.shift = function(dir) {
        if (!this.isBlockedLeft() && dir == 'left'){
            this.x -= 40;
        }

        if (!this.isBlockedRight() && dir == 'right'){
            this.x += 40;
        }
    }

    this.update = function() {
        if (!this.isBlockedDownward()){
            this.y += 40
        }
    }
    this.forceUpdate = function() {
        this.y += 40;
    }


    this.draw = function(img) {
        image(img, this.x, this.y);

    }
}

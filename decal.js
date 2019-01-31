function Decal(x, y, img, lifespan) {
    this.x = x;
    this.y = y;

    this.img = img;

    this.lifespan = lifespan;

    this.delete = false;
    this.millisAtCreation = millis();

    this.draw = function() {
        image(this.img, this.x, this.y);

        if(millis() > this.millisAtCreation + this.lifespan){
            this.delete = true;
        }
    }
}

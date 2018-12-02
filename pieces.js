function Pieces() {
	this.shape = [];
	
	//meta data for tetromino shapes
	//index 0 is row 1 of blocks
	//index 1 is row 2 of blocks
	//index 2 is row 3 of blocks
	//index 3 is row 4 of blocks
	//index 4 is piece color
	//index 5 is a string of the block name

	this.Iblock = function(x) {
		if (x == 0){
			this.shape = [
				"****",
				"OOOO",
				"****",
				"****"];
		}
		if (x == 1){
			this.shape = [
				"**O*",
				"**O*",
				"**O*",
				"**O*"];
		}
		if (x == 2){
			this.shape = [
				"****",
				"****",
				"OOOO",
				"****"];
		}
		if (x == 3){
			this.shape = [
				"*O**",
				"*O**",
				"*O**",
				"*O**"];
		}

		this.shape.push([0, 255, 255]);
		this.shape.push(7);

		return this.shape;
	}


	this.Oblock = function(x) {
		if (x == 0){
			this.shape = [
				"*OO*",
				"*OO*",
				"****",
				"****"];
		}
		if (x == 1){
			this.shape = [
				"*OO*",
				"*OO*",
				"****",
				"****"];
		}
		if (x == 2){
			this.shape = [
				"*OO*",
				"*OO*",
				"****",
				"****"];
		}
		if (x == 3){
			this.shape = [
				"*OO*",
				"*OO*",
				"****",
				"****"];
		}

		this.shape.push([255, 255, 0]);
		this.shape.push(6);

		return this.shape;
	}


	this.Tblock = function(x) {
		if (x == 0){
			this.shape = [
				"*O**",
				"OOO*",
				"****",
				"****"];
		}
		if (x == 1){
			this.shape = [
				"*O**",
				"*OO*",
				"*O**",
				"****"];
		}
		if (x == 2){
			this.shape = [
				"****",
				"OOO*",
				"*O**",
				"****"];
		}
		if (x == 3){
			this.shape = [
				"*O**",
				"OO**",
				"*O**",
				"****"];
		}

		this.shape.push([170, 0, 255]);
		this.shape.push(5);

		return this.shape;
	}


	this.Lblock = function(x) {
		if (x == 0){
			this.shape = [
				"**O*",
				"OOO*",
				"****",
				"****"];
		}
		if (x == 1){
			this.shape = [
				"*O**",
				"*O**",
				"*OO*",
				"****"];
		}
		if (x == 2){
			this.shape = [
				"****",
				"OOO*",
				"O***",
				"****"];
		}
		if (x == 3){
			this.shape = [
				"OO**",
				"*O**",
				"*O**",
				"****"];
		}

		this.shape.push([255, 165, 0]);
		this.shape.push(4);

		return this.shape;
	}


	this.Jblock = function(x) {
		if (x == 0){
			this.shape = [
				"O***",
				"OOO*",
				"****",
				"****"];
		}
		if (x == 1){
			this.shape = [
				"*OO*",
				"*O**",
				"*O**",
				"****"];
		}
		if (x == 2){
			this.shape = [
				"****",
				"OOO*",
				"**O*",
				"****"];
		}
		if (x == 3){
			this.shape = [
				"*O**",
				"*O**",
				"OO**",
				"****"];
		}

		this.shape.push([0, 0, 255]);
		this.shape.push(3);

		return this.shape;
	}


	this.Sblock = function(x) {
		if (x == 0){
			this.shape = [
				"*OO*",
				"OO**",
				"****",
				"****"];
		}
		if (x == 1){
			this.shape = [
				"*O**",
				"*OO*",
				"**O*",
				"****"];
		}
		if (x == 2){
			this.shape = [
				"****",
				"*OO*",
				"OO**",
				"****"];
		}
		if (x == 3){
			this.shape = [
				"O***",
				"OO**",
				"*O**",
				"****"];
		}

		this.shape.push([0, 255, 0]);
		this.shape.push(2);

		return this.shape;
	}


	this.Zblock = function(x) {
		if (x == 0){
			this.shape = [
				"OO**",
				"*OO*",
				"****",
				"****"];
		}
		if (x == 1){
			this.shape = [
				"**O*",
				"*OO*",
				"*O**",
				"****"];
		}
		if (x == 2){
			this.shape = [
				"****",
				"OO**",
				"*OO*",
				"****"];
		}
		if (x == 3){
			this.shape = [
				"*O**",
				"OO**",
				"O***",
				"****"];
		}

		this.shape.push([255, 0, 0]);
		this.shape.push(1);

		return this.shape;
	}
}
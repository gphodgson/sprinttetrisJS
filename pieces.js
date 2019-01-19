class Pieces {

	//meta data for tetromino shapes:
	//the methods will return an array with the following values
	//index 0 is row 1 of blocks
	//index 1 is row 2 of blocks
	//index 2 is row 3 of blocks
	//index 3 is row 4 of blocks
	//index 4 is piece image
	//index 5 is an int block ID

	//x = 0: 0 degrees rotation
	//x = 1: 90 degrees rotation
	//x = 2: 180 degrees rotation
	//x = 3: 270 degrees rotation

	static Iblock(x) {
		var shape = [];
		if (x == 0){
			shape = [
				"***",
				"OOOO",
				"****",
				"****"];
		}
		if (x == 1){
			shape = [
				"**O*",
				"**O*",
				"**O*",
				"**O*"];
		}
		if (x == 2){
			shape = [
				"****",
				"****",
				"OOOO",
				"****"];
		}
		if (x == 3){
			shape = [
				"*O**",
				"*O**",
				"*O**",
				"*O**"];
		}

		shape.push(Iblock_img);
		shape.push(7);

		return shape;
	}


	static Oblock(x) {
		var shape = [];
		if (x == 0){
			shape = [
				"*OO*",
				"*OO*",
				"****",
				"****"];
		}
		if (x == 1){
			shape = [
				"*OO*",
				"*OO*",
				"****",
				"****"];
		}
		if (x == 2){
			shape = [
				"*OO*",
				"*OO*",
				"****",
				"****"];
		}
		if (x == 3){
			shape = [
				"*OO*",
				"*OO*",
				"****",
				"****"];
		}

		shape.push(Oblock_img);
		shape.push(6);

		return shape;
	}


	static Tblock(x) {
		var shape = [];
		if (x == 0){
			shape = [
				"*O**",
				"OOO*",
				"****",
				"****"];
		}
		if (x == 1){
			shape = [
				"*O**",
				"*OO*",
				"*O**",
				"****"];
		}
		if (x == 2){
			shape = [
				"****",
				"OOO*",
				"*O**",
				"****"];
		}
		if (x == 3){
			shape = [
				"*O**",
				"OO**",
				"*O**",
				"****"];
		}

		shape.push(Tblock_img);
		shape.push(5);

		return shape;
	}


	static Lblock(x) {
		var shape = [];
		if (x == 0){
			shape = [
				"**O*",
				"OOO*",
				"****",
				"****"];
		}
		if (x == 1){
			shape = [
				"*O**",
				"*O**",
				"*OO*",
				"****"];
		}
		if (x == 2){
			shape = [
				"****",
				"OOO*",
				"O***",
				"****"];
		}
		if (x == 3){
			shape = [
				"OO**",
				"*O**",
				"*O**",
				"****"];
		}

		shape.push(Lblock_img);
		shape.push(4);

		return shape;
	}


	static Jblock(x) {
		var shape = [];
		if (x == 0){
			shape = [
				"O***",
				"OOO*",
				"****",
				"****"];
		}
		if (x == 1){
			shape = [
				"*OO*",
				"*O**",
				"*O**",
				"****"];
		}
		if (x == 2){
			shape = [
				"****",
				"OOO*",
				"**O*",
				"****"];
		}
		if (x == 3){
			shape = [
				"*O**",
				"*O**",
				"OO**",
				"****"];
		}

		shape.push(Jblock_img);
		shape.push(3);

		return shape;
	}


	static Sblock(x) {
		var shape = [];
		if (x == 0){
			shape = [
				"*OO*",
				"OO**",
				"****",
				"****"];
		}
		if (x == 1){
			shape = [
				"*O**",
				"*OO*",
				"**O*",
				"****"];
		}
		if (x == 2){
			shape = [
				"****",
				"*OO*",
				"OO**",
				"****"];
		}
		if (x == 3){
			shape = [
				"O***",
				"OO**",
				"*O**",
				"****"];
		}

		shape.push(Sblock_img);
		shape.push(2);

		return shape;
	}


	static Zblock(x) {
		var shape = [];
		if (x == 0){
			shape = [
				"OO**",
				"*OO*",
				"****",
				"****"];
		}
		if (x == 1){
			shape = [
				"**O*",
				"*OO*",
				"*O**",
				"****"];
		}
		if (x == 2){
			shape = [
				"****",
				"OO**",
				"*OO*",
				"****"];
		}
		if (x == 3){
			shape = [
				"*O**",
				"OO**",
				"O***",
				"****"];
		}

		shape.push(Zblock_img);
		shape.push(1);

		return shape;
	}
}

var Game = {};

Game.update = function(){ //simulate game for one tick
	Time.update();
	var i;
	console.log(Unit.list.length);
	//update all the units
	for (i = 0; i < Unit.list.length; i++){
		Unit.list[i].update();
	}
}

global.Game = Game;

function Unit (id, position, goal) {
	this.id = id;
	this.position = position;
	this.goal = goal;
	this.speed = 20;

	this.update = function() {
		this.position.add(
			new Point().init(this.goal).sub(this.position)
			.normalize()
		);//*Time.deltaTime*this.speed);
		//console.log(new Point().init(this.position).normalize().getInfo());
	}
}

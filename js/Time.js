function Time() {
	this.startTime = date.getTime()/1000;
}

Time.date = new Date();
Time.startTime = 0;
Time.time = 0;
Time.deltaTime = 0;

Time.update = function() {
	var nextTime = Time.date.getTime()/1000-Time.startTime;
	Time.deltaTime = Time.nextTime-Time.time;
	Time.time = nextTime;
}

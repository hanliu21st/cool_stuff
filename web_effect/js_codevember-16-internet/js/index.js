class Interwebs {
	constructor(){
		this.transitioning = false;
		
		this.listen();
		
		this.goTo('home');
	}
	
	listen(){
		$('.window').on('click', 'a', (e)=>{
			e.preventDefault();
			var page = $(e.currentTarget).attr('href');
			
			if(!this.transitioning){
				this.transitioning = true;
				this.goTo(page);
			}
		});
	}
	
	goTo(page) {
		this.load(page, ()=>{
			this.transitioning = false;
		});
	}
	
	load(page, callback){
		$('.window').addClass('loading');
		
		setTimeout(()=>{
			this.clear();
			this.loadPage(page);
			$('.site-wrapper').scrollTop(0);
			
			setTimeout(()=>{
				$('.window').removeClass('loading');
				callback();
			}, 500);
		}, 500);
		
		
		
	}
	
	clear(){
		$('.site-wrapper').html('');
	}
	
	append(html){
		$('.site-wrapper').append(html);
	}
	
	loadPage(name){
		var html = $(`#${name}`).html();
		this.clear();
		this.append(html);
	}
}

class Bg {
	constructor(){
		this.setup();
		this.tick();
	}
	
	setup(){
		this.c = $('#bg-canvas')[0];
		this.ctx = this.c.getContext('2d');
		
		this.c.width = window.innerWidth;
		this.c.height = window.innerHeight;
		
		this.frame = 0;
		this.dots = [];
		
		for(var i = 0; i < 100; i++){
			this.dots.push({
				x: this.c.width * Math.random(),
				y: this.c.height * Math.random(),
				v: Math.random(),
				d: 360 * Math.random()
			});
		}
	}
	
	tick() {
		this.frame += 1;
		this.draw();
		requestAnimationFrame(this.tick.bind(this));
	}
	
	draw(){
		this.ctx.rect(0, 0, this.c.width, this.c.height);
		this.ctx.fillStyle = '#252839';
		this.ctx.fill();
		
		this.drawDots();
	}
	
	drawDots(){
		this.ctx.fillStyle = '#1b1e2b';
		
		this.dots.forEach((dot, i)=>{
			this.ctx.beginPath();
			this.ctx.arc(dot.x, dot.y, 2, 0, Math.PI*2);
			this.ctx.fill();
			this.ctx.closePath();
			
			this.drawLinks(dot, i);
			this.moveDot(dot);
		});
	}
	
	drawLinks(dot, i) {
		this.dots.forEach((dot2, i2)=>{
			if(i !== i2) {
				var distanceX = Math.abs(dot.x - dot2.x);
				var distanceY = Math.abs(dot.y - dot2.y);				
				var threshold = 60;
				
				if(distanceX < threshold && distanceY < threshold) {
					this.ctx.beginPath();
					this.ctx.moveTo(dot.x, dot.y);
					this.ctx.lineTo(dot2.x, dot2.y);
					this.ctx.strokeStyle = '#1b1e2b';
					this.ctx.stroke();
					this.ctx.closePath();
				}
			}
		});
	}
	
	moveDot(dot){
		var flip = false;
		dot.x += Math.cos(dot.d) * dot.v;
		dot.y += Math.sin(dot.d) * dot.v;
		
		if(dot.x <= 0 || dot.y <= 0 || dot.y >= this.c.height || dot.x >= this.c.width) {
			flip = true;
		}
		
		if(flip) {
			if(dot.d < 180) {
				dot.d -= 45;
			} else {
				dot.d += 45;
			}
		}
	}
}

class Cats {
	constructor(){
		this.setup();
		this.tick();
	}
	
	setup(){
		this.c = $('#cats-canvas')[0];
		this.ctx = this.c.getContext('2d');
		
		this.c.width = 600;
		this.c.height = 220;
		
		this.frame = 0;
	}
	
	tick() {
		this.frame += 5;
		this.draw();
		requestAnimationFrame(this.tick.bind(this));
	}
	
	draw(){
		this.ctx.clearRect(0, 0, this.c.width, this.c.height);		
		this.drawRainbow('#ff0000', 100);
		this.drawRainbow('#ff9900', 110);
		this.drawRainbow('#ffff00', 120);
		this.drawRainbow('#33ff00', 130);
		this.drawRainbow('#0099ff', 140);
		this.drawRainbow('#6633ff', 150);
		
		this.drawCat();
	}
	
	drawRainbow(color, y) {
		this.ctx.beginPath();
		for(var i = 0; i < 320; i+=40){
			var offset = Math.sin((this.frame - i) / 20) * 10;
			this.ctx.lineTo(300 - i, y + offset);
			this.ctx.lineTo(300 - i - 40, y + offset);
		}
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = 10;
		this.ctx.stroke();
		this.ctx.closePath();
	}
	
	drawCat() {
		var offset = Math.sin((this.frame+10)/ 20) * 10;
		
		this.drawFoot(offset, 310, 160);
		this.drawFoot(offset, 390, 160);
		
		this.drawHead(offset);
	
		this.ctx.beginPath();
		this.ctx.rect(300, 90 + offset, 120, 80);
		this.ctx.fillStyle = '#F89BFF';
		this.ctx.strokeStyle = '#FACC9B';
		this.ctx.lineWidth = 20;
		this.ctx.stroke();
		this.ctx.fill();
		this.ctx.closePath();
	}
	
	drawFoot(offset, x, y) {
		this.ctx.beginPath();
		this.ctx.rect(x, y + offset, 20, 40);
		this.ctx.fillStyle = '#8F8F8F';
		this.ctx.fill();
		this.ctx.strokeStyle = 'black';
		this.ctx.lineWidth = 5;
		this.ctx.stroke();
		this.ctx.closePath();
	}
	
	drawHead(offset) {
		this.ctx.beginPath();
		this.ctx.moveTo(420, 90 + offset);
		this.ctx.lineTo(450, 100 + offset);
		this.ctx.lineTo(470, 90 + offset);
		this.ctx.lineTo(490, 100 + offset);
		this.ctx.lineTo(490, 150 + offset);
		this.ctx.lineTo(450, 170 + offset);
		this.ctx.lineTo(420, 150 + offset);
		this.ctx.fillStyle = '#8F8F8F';
		this.ctx.fill();
		this.ctx.strokeStyle = 'black';
		this.ctx.lineWidth = 5;
		this.ctx.stroke();
		this.ctx.closePath();
	}
}

class Futurama {
	constructor(){
		this.setup();
		this.listen();
		this.tick();
	}
	
	listen(){
		this.c.addEventListener('mousemove', (e)=>{
			this.x = e.offsetX;
			this.y = e.offsetY;
		});
	}
	
	setup(){
		this.c = $('#futurama-canvas')[0];
		this.ctx = this.c.getContext('2d');
		
		this.c.width = 600;
		this.c.height = 1000;
		
		this.frame = 0;
		
		this.x = 300;
		this.y = 160;
		
		this.stars = [];
		
		for(var i = 0; i < 200; i++){
			this.stars.push({
				x: 600 * Math.random(),
				y: 1000 * Math.random(),
				s: Math.random()/2
			});
		}
	}
	
	tick() {
		this.frame += 5;
		this.draw();
		requestAnimationFrame(this.tick.bind(this));
	}
	
	draw(){
		this.ctx.clearRect(0, 0, this.c.width, this.c.height);
		this.drawStars();
		this.drawShip();
	}
	
	drawStars(){
		this.stars.forEach((star)=>{
			this.ctx.beginPath();
			this.ctx.arc(star.x, star.y, star.s, 0, Math.PI * 2);
			this.ctx.fillStyle = `rgba(255, 255, 255, star.s)`;
			this.ctx.fill();
			this.ctx.closePath();
			
			this.moveStar(star);
		});
	}
	
	moveStar(star) {
		star.x -= star.s;
		if(star.x < 0) {
			star.x = 601;
		}
	}
	
	drawShip(){
		this.ctx.beginPath();
		this.ctx.moveTo(this.x + 50, this.y);
		this.ctx.quadraticCurveTo(this.x + 20, this.y - 30, this.x - 50, this.y - 5);
		this.ctx.lineTo(this.x - 50, this.y + 5);
		this.ctx.quadraticCurveTo(this.x, this.y + 15, this.x + 20, this.y + 10);
		this.ctx.fillStyle = '#72D49C';
		this.ctx.fill();
		this.ctx.closePath();
		
		this.drawThrust();
		
		this.drawTail();
		this.drawWing();
		this.drawThruster();
		this.drawStripe();
	}
	
	drawWing(){
		this.ctx.beginPath();
		this.ctx.moveTo(this.x - 50, this.y + 5);
		this.ctx.lineTo(this.x - 40, this.y + 15);
		this.ctx.lineTo(this.x - 80, this.y + 20);
		this.ctx.lineTo(this.x - 30, this.y + 20);
		this.ctx.lineTo(this.x - 20, this.y + 10);
		this.ctx.fillStyle = '#488773';
		this.ctx.fill();
		this.ctx.closePath();
	}
	
	drawTail(){
		this.ctx.beginPath();
		this.ctx.moveTo(this.x - 35, this.y - 10);
		this.ctx.lineTo(this.x - 45, this.y - 20);
		this.ctx.lineTo(this.x - 100, this.y - 22);
		this.ctx.lineTo(this.x - 60, this.y - 10);
		this.ctx.lineTo(this.x - 50, this.y - 5);
		this.ctx.fillStyle = '#488773';
		this.ctx.fill();
		this.ctx.closePath();
	}
	
	drawStripe(){
		this.ctx.beginPath();
		this.ctx.moveTo(this.x - 50, this.y);
		this.ctx.lineTo(this.x + 50, this.y);
		this.ctx.lineCap = 'round';
		this.ctx.lineWidth = 4;
		this.ctx.strokeStyle = '#B6181C';
		this.ctx.stroke();
		this.ctx.closePath();
	}
	
	drawThruster(){
		this.ctx.beginPath();
		this.ctx.moveTo(this.x - 50, this.y - 5);
		this.ctx.quadraticCurveTo(this.x - 53, this.y - 5, this.x - 56, this.y - 3);
		this.ctx.lineTo(this.x - 56, this.y + 3);
		this.ctx.quadraticCurveTo(this.x - 53, this.y + 5, this.x - 50, this.y + 5);
		this.ctx.fillStyle = '#F5EEC2';
		this.ctx.fill();
		this.ctx.closePath();
	}
	
	drawThrust(){
		var offsetY = Math.sin((this.frame+10)/ 5) * 10;
		var offsetX = Math.cos((this.frame+10)/ 20) * 10;
		
		this.ctx.beginPath();
		this.ctx.moveTo(this.x - 60, this.y - 5);
		this.ctx.quadraticCurveTo(this.x - 100, this.y - 20, this.x - 200 + offsetX, this.y + offsetY);
		this.ctx.quadraticCurveTo(this.x - 100, this.y + 20, this.x - 60, this.y + 5);
		this.ctx.fillStyle = 'rgba(200, 220, 255, .2)';
		this.ctx.fill();
		this.ctx.closePath();
	}
}

$(document).ready(()=>{
	new Bg();
	new Interwebs();
});
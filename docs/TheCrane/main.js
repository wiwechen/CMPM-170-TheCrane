title = "The Crane Game!";

description = `
`;

characters = [
`
LLLL
  LL
    LL
    LL
  LL
`
,
`
LLLL
    LL
    LL
    LL
`
];

const G = {
	TIMER_START: 15,
	WIDTH: 100,
	HEIGHT: 150
}

options = {	
	viewSize: {x: G.WIDTH, y: G.HEIGHT}
};

/**
 * @typedef {{
* pos: Vector,
* speed: number 
* }} Player
*/

/**
* @type { Player }
*/
let crane;

function update() {
	if (!ticks) {
		crane = {
			pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.25),
			speed: 1
		};
	}
	// display timer text
	text("Time: "+time, 3, 10);

	//color("cyan");
	if(input.isPressed){
		crane.pos.y += 1;
		char("b", crane.pos.x + 2, crane.pos.y );
		char("b", crane.pos.x - 2, crane.pos.y , {
			mirror: {x : -1}
		})
	}
	else{
		crane.pos.y == G.HEIGHT/4 ? 0 : crane.pos.y = G.HEIGHT/4;
		crane.pos.x += crane.speed;
		char("a", crane.pos.x + 2, crane.pos.y);
		char("a", crane.pos.x - 2, crane.pos.y, {
			mirror: {x : -1}
		})
	}
	if(crane.pos.x > G.WIDTH || crane.pos.x < 0)
		crane.speed *= -1;
	line(0, G.HEIGHT/4 -5, G.WIDTH, G.HEIGHT/4 -5);
}

// timer functionailty
let time = G.TIMER_START;
let timer = setInterval(() => {
	if (time > 0) {
		time--;
	}
}, 1000);

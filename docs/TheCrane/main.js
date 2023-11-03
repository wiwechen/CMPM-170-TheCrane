title = "The Crane Game!";

description = `
`;

characters = [];

options = {
};

// global variables/consts
const G = {
	TIMER_START: 15
}

function update() {
	if (!ticks) {	
	}
	else {
		// display timer text
		text("Time: "+time, 3, 10);
	}
}

// timer functionailty
let time = G.TIMER_START;
let timer = setInterval(() => {
	if (time > 0) {
		time--;
	}
}, 1000);

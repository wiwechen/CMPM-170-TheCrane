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
`,
  `
LLLL
    LL
    LL
    LL
`,
];

const G = {
  WIDTH: 100,
  HEIGHT: 150,
  TIMER_START: 15,
  BOX_SIZE: 7,
};

options = {
  viewSize: { x: G.WIDTH, y: G.HEIGHT },
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

/**
 * @typedef {{
 * pos: Vector
 * color: Color,
 * size: number,
 * }}Box
 */

/**
 * @type { Box[] }
 */
let boxes = [];
/**
 * @type { Color[] }
 */
let possibleColors = ["red", "blue", "yellow"];
let time = -1;
let boxSpawner = null;
let lastTimer = performance.now();
let boxTimer = performance.now();
let targetColor = possibleColors[randomInt(0, possibleColors.length)];

function update() {
  if (!ticks) {
    time = G.TIMER_START;
    crane = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.25),
      speed: 1,
    };

    // initialize boxes
    let width = 0.25;
    for (let color of possibleColors) {
      let box = {
        pos: vec(G.WIDTH * width, G.HEIGHT * 0.75),
        color: color,
        size: G.BOX_SIZE,
      };
      boxes.push(box);
      width += 0.25;
    }
  }

  const currentTime = performance.now();
  if (currentTime - lastTimer >= 1000) {
    lastTimer = currentTime;
    subTime();
  }

  if (currentTime - boxTimer >= 10000) {
    boxTimer = currentTime;
    spawnNewBox();
  }

  if (time == 0) {
    cleanup();
  }
  // display timer text
  text("Time: " + time, 3, 10);
  text("Target: ", 3, 20);
  text(targetColor, 50, 20, {
    color: targetColor,
  });

  //creating Boxes Here
  for (let bx of boxes) {
    color(bx.color);
    box(bx.pos, bx.size);
  }

  color("light_black");
  if (input.isPressed) {
    crane.pos.y += 1;
    char("b", crane.pos.x + 2, crane.pos.y);
    char("b", crane.pos.x - 2, crane.pos.y, {
      mirror: { x: -1 },
    });
  } else {
    crane.pos.y == G.HEIGHT / 4 ? 0 : (crane.pos.y = G.HEIGHT / 4);
    crane.pos.x += crane.speed;
    char("a", crane.pos.x + 2, crane.pos.y);
    char("a", crane.pos.x - 2, crane.pos.y, {
      mirror: { x: -1 },
    });
  }
  if (crane.pos.x > G.WIDTH || crane.pos.x < 0) crane.speed *= -1;
  line(0, G.HEIGHT / 4 - 5, G.WIDTH, G.HEIGHT / 4 - 5);

  //Checks Collison on boxes here
  remove(boxes, (b) => {
    const isCollidingRedBox = char("b", crane.pos).isColliding.rect.red;
    const isCollidingBlueBox = char("b", crane.pos).isColliding.rect.blue;
    const isCollidingYellowBox = char("b", crane.pos).isColliding.rect.yellow;

    if (isCollidingBlueBox) {
      crane.pos.y == G.HEIGHT / 4 ? 0 : (crane.pos.y = G.HEIGHT / 4);
      spawnBlueBox();
      if (targetColor == "blue") {
        targetColor = possibleColors[randomInt(0, possibleColors.length)];
        addTime(2);
        addScore(10, b.pos);
      }
    } else if (isCollidingRedBox) {
      crane.pos.y == G.HEIGHT / 4 ? 0 : (crane.pos.y = G.HEIGHT / 4);
      spawnRedBox();
      if (targetColor == "red") {
        targetColor = possibleColors[randomInt(0, possibleColors.length)];
        addTime(2);
        addScore(10, b.pos);
      }
    } else if (isCollidingYellowBox) {
      crane.pos.y == G.HEIGHT / 4 ? 0 : (crane.pos.y = G.HEIGHT / 4);
      spawnYellowBox();
      if (targetColor == "yellow") {
        targetColor = possibleColors[randomInt(0, possibleColors.length)];
        addTime(2);
        addScore(10, b.pos);
      }
    }
  });
}

// function used to spawn new box of random color and location (the randomness can be fixed later if need be)
function spawnNewBox() {
  let color = possibleColors[randomInt(0, possibleColors.length - 1)];
  let box = {
    pos: vec(G.WIDTH * Math.random(), G.HEIGHT * 0.75),
    color: color,
    size: G.BOX_SIZE,
  };
  boxes.push(box);
}

//Spawning Back Boxes the moment they are touched:

function spawnRedBox() {
  let box = {
    pos: vec(G.WIDTH * 0.25, G.HEIGHT * 0.75),
    color: possibleColors[0],
    size: G.BOX_SIZE,
  };
  boxes.push(box);
}

function spawnBlueBox() {
  let box = {
    pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.75),
    color: possibleColors[1],
    size: G.BOX_SIZE,
  };
  boxes.push(box);
}

function spawnYellowBox() {
  let box = {
    pos: vec(G.WIDTH * 0.75, G.HEIGHT * 0.75),
    color: possibleColors[2],
    size: G.BOX_SIZE,
  };
  boxes.push(box);
}

// timer functionailty (timer decreases every second)

// helper function - generates random number between min and max (inclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * max + min);
}

// reset things for gamestart
function cleanup() {
  boxes.length = 0;
  clearInterval(boxSpawner);
  end();
}

function subTime() {
  if (time > 0) {
    time -= 1;
  }
}

function addTime(num) {
  time += num;
}

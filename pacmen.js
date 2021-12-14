const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'], // right-open, right-close
  ['./images/PacMan3.png', './images/PacMan4.png'], // left-open, left-close
];
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  let direction = 0;
  let focus = 0;

  // Add image to div id = game
  let game = document.getElementById('game');
  let img = document.createElement('img');
  img.style.position = 'absolute';
  img.src = './images/PacMan1.png'; // right-open
  img.width = 100;

  // set position
  img.style.left = position.x; 
  img.style.top = position.y;

  // add new Child image to game
  game.appendChild(img);

  // return details in an object
  return {
    position,
    velocity,
    img,
    direction, 
    focus
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.img.src = pacArray[item.direction][item.focus = (item.focus + 1) % 2];
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.img.style.left = item.position.x;
    item.img.style.top = item.position.y;
  });
  setTimeout(update, 150);
}

function checkCollisions(item) {
  // detect collision with all walls and make pacman bounce
  let leftEdge = item.position.x + item.velocity.x;
  let rightEdge = leftEdge + item.img.width;
  let topEdge = item.position.y + item.velocity.y;
  let bottomEdge = topEdge + item.img.height;
  if (rightEdge > window.innerWidth || leftEdge < 0) {
    item.velocity.x *= -1;
    item.direction = (item.direction + 1) % 2;
  }
  if (bottomEdge > window.innerHeight || topEdge < 0) item.velocity.y *= -1;
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

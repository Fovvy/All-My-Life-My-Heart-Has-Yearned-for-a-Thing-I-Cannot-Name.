function openNav() {
  document.getElementById("drawer").style.width = "320px";
  document.body.style.marginLeft = "320px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("drawer").style.width = "0";
  document.body.style.marginLeft = "0";
  document.body.style.backgroundColor = "white";
}

class Ball {
  constructor(x, y, radius, ballType) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ballType = ballType;
    this.velocity = this.randomVelocity();
  }

  randomVelocity() {
    const speed = this.ballType === 'red' ? width * 0.006 : width * 0.002;
    const phi = TWO_PI * random(0.3, 0.7);
    const xVel = speed * cos(phi);
    const yVel = speed * sin(phi);
    return createVector(xVel, yVel);
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  render() {
    noStroke();
    if (this.ballType === 'red') {
      fill(255, 99, 71, 200); // 'tomato' color r, g, b, a.
    } else {
      fill(137, 207, 240, 200); // 'baby blue' color r, g, b, a.
    }
    circle(this.x, this.y, this.radius);
  }}


let height, width;
let reds = [];
let blues = [];
let doorOpen = false;

function setup() {
  width = min(window.innerWidth - 20, 900);
  height = min(window.innerHeight - 200, width * 0.5);
  createCanvas(width, height);

  const demon = select('#demon-svg');
  const uiInstructions = select('#ui-instructions');
  const demonContainer = select('#demon-container');

  demon.mousePressed(function () {
    doorOpen = !doorOpen;
    uiInstructions.hide();
    if (doorOpen) {
      demonContainer.addClass('dancing-demon');
    } else {
      demonContainer.removeClass('dancing-demon');
    }
  });

  angleMode(RADIANS);

  setupLeft();
  setupRight();
}

function setupLeft() {
  const radius = width * 0.02;

  for (let i = 0; i < 3; i++) {
    const randomX = random(width * 0.1, width * 0.4);
    const randomY = random(height * 0.2, height * 0.8);
    const newRed = new Ball(randomX, randomY, radius, ballType = 'red');
    reds.push(newRed);
  }

  for (let i = 0; i < 3; i++) {
    const randomX = random(width * 0.1, width * 0.4);
    const randomY = random(height * 0.2, height * 0.8);
    const newBlue = new Ball(randomX, randomY, radius, ballType = 'blue');
    blues.push(newBlue);
  }
}

function setupRight() {
  const radius = width * 0.02;

  for (let i = 0; i < 3; i++) {
    const randomX = random(width * 0.6, width * 0.9);
    const randomY = random(height * 0.2, height * 0.8);
    const newRed = new Ball(randomX, randomY, radius, ballType = 'red');
    reds.push(newRed);
  }

  for (let i = 0; i < 3; i++) {
    const randomX = random(width * 0.6, width * 0.9);
    const randomY = random(height * 0.2, height * 0.8);
    const newBlue = new Ball(randomX, randomY, radius, ballType = 'blue');
    blues.push(newBlue);
  }
}

function draw() {

  background(255); // white box background

  noFill();
  stroke(54); // for "walls"
  strokeWeight(10);

  rect(0, 0, width * 0.5, height); // left side of box
  rect(width * 0.5, 0, width * 0.5, height); // right side of box

  // create open door illusion by covering box borders
  // with a white rectangle
  if (doorOpen) {
    fill(255);
    noStroke();
    rect(width * 0.5 - 10, 5, 20, height - 10);
  }

  reds.forEach(r => {
    didHitWall(r);
    r.update();
    r.render();
  });

  blues.forEach(b => {
    didHitWall(b);
    b.update();
    b.render();
  });
}

function didHitWall(ball) {
  // collision detection and ball behavior upon collisions
  if (ball.y <= 0) {
    ball.velocity.y *= -1;
    ball.y = 5;
  } else if (ball.y >= height) {
    ball.velocity.y *= -1;
    ball.y = height - 5;
  } else if (ball.x <= 0) {
    ball.velocity.x *= -1;
    ball.x = 5;
  } else if (ball.x >= width) {
    ball.velocity.x *= -1;
    ball.x = width - 5;
  } else if (ball.x >= width * 0.5 - 10 && ball.x <= width * 0.5 + 10) {
    if (!doorOpen) {
      if (ball.velocity.x < 0) {
        ball.x = width * 0.5 + 15;
      } else {
        ball.x = width * 0.5 - 15;
      }
      ball.velocity.x *= -1;
    }
  }
}
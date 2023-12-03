let particles = [];

function setup() {
  createCanvas(800, 800); // Double the size of the canvas
}

let x = 400;
let y = 400;
let speedX = 5;
let speedY = 2;

function draw() {
  background(220);

  // Draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].display();
    particles[i].update();

    // Remove particles when they fade away
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  // Draw a smiling face
  fill(0, 0, 255);
  ellipse(x, y, 100, 100); // Head

  fill(0);
  ellipse(x - 20, y - 10, 20, 20); // Left eye
  ellipse(x + 20, y - 10, 20, 20); // Right eye

  noFill();
  stroke(0);
  strokeWeight(4);
  arc(x, y + 20, 40, 30, 0.2, PI - 0.2); // Smile

  // Move the face
  x = x + speedX;
  y = y + speedY;

  // Bounce off the walls
  if (x > width || x < 0) {
    speedX = -speedX;
  }

  if (y > height || y < 0) {
    speedY = -speedY;
  }

  // Create a new particle
  particles.push(new Particle(x, y, true));
}

class Particle {
  constructor(x, y, isBlue) {
    this.x = x;
    this.y = y;
    this.speedX = random(-5, 5);
    this.speedY = random(-5, 5);
    this.size = isBlue ? random(20, 40) : random(10, 20);
    this.alpha = 255;
    this.isBlue = isBlue;
    this.color = isBlue ? color(0, 0, 255) : color(random(255), random(255), random(255));
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 2;
  }

  display() {
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
    ellipse(this.x, this.y, this.size, this.size);

    if (this.isBlue) {
      fill(0);
      ellipse(this.x - this.size / 4, this.y - this.size / 4, this.size / 2, this.size / 2); // Left eye
      ellipse(this.x + this.size / 4, this.y - this.size / 4, this.size / 2, this.size / 2); // Right eye
      noFill();
      stroke(0);
      strokeWeight(2);
      arc(this.x, this.y + this.size / 4, this.size / 2, this.size / 4, 0.2, PI - 0.2); // Smile
    }
  }
}

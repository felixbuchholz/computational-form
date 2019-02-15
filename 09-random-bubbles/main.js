// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js

const w = window.innerWidth;
const h = window.innerHeight;
const myB = 0.96;
const shadows = true;
let rows = 15;
let cols = 70;
let startSize = 8;
let perspectiveFactor = 10;

function setup() {
  colorMode(HSB, 1, 1, 1, 1);
  backgroundColor = color(0.9, 0.1, 0.2);
  ballColors = [color(0.95, 0.6, 1), color(0.5, 0.6, 1), color(0.15, 0.6, 1)];

  highlightColor = color(0, 0, 1, 0.9);
  shadingColor = color(0, 0, 0, 0.05);
  angleMode(DEGREES);
  createCanvas(w, h);
  noStroke();

  translate(0, 20);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let xPos = (col * w) / cols + random(-200, 300);
      const xRandomness = random(-10, 10);
      xPos += xRandomness;
      let yPos = row * row * rows * 0.45;
      const yRandomness = random(0, 10);
      yPos += yRandomness;
      let size = startSize + perspectiveFactor * row;
      const sizeRandomness = random(-10, 10);
      const randomColorPicker = floor(random(3));
      const color = ballColors[randomColorPicker];
      const frequencyCondition =
        min(random(1), random(1), random(1)) >= row / rows;
      console.log(col, col / cols);

      if (frequencyCondition) {
        drawBall(xPos, yPos, size, color);
      }
    }
  }
}

function draw() {}

function drawBall(x, y, r, myfill) {
  push();
  translate(x, y);
  // shadow
  if (shadows) {
    push();
    fill(shadingColor);
    ellipse(0, r, 2 * r, 0.1 * r);
    pop();
  }
  // base circle
  fill(myfill);
  circle(0, 0, r);
  drawReflections(0, 0, r);
  drawProperArc(r, r * 0.25, 60, shadingColor);
  drawProperArc(r * 0.9, r * 0.1, -120, highlightColor);
  pop();
}

function drawReflections(x, y, r) {
  push();
  fill(highlightColor);
  circle(x - 0.3 * r, y - 0.4 * r, 0.08 * r);
  circle(x - 0.44 * r, y - 0.24 * r, 0.04 * r);
  // circle(x - 0.3 * r, y + 0.5 * r, 0.04 * r);
  pop();
}

function drawProperArc(radius, progress, rotation, myfill) {
  push();
  rotate(rotation);
  fill(myfill);
  beginShape();
  // Start, mid bottom
  vertex(0, radius);
  // Outer (left)
  bezierVertex(
    +radius * myB,
    radius,
    +radius,
    0 + (1 - myB * 0.98) * radius,
    +radius,
    0
  );
  bezierVertex(
    +radius,
    -radius * myB,
    0 + (1 - myB) * radius * 0.98,
    -radius,
    0,
    -radius
  );
  // Inner (right)
  bezierVertex(
    (+radius - progress) * myB,
    -radius + (1 - myB * 0.98) * radius,
    +radius - progress,
    0 - (1 - myB * 0.98) * radius,
    0 + radius - progress,
    0
  );
  bezierVertex(
    (+radius - progress) * myB,
    radius - (1 - myB * 0.98) * radius,
    0,
    radius,
    0,
    radius
  );
  endShape();
  pop();
}

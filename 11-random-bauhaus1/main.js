// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js

const w = window.innerWidth;
const h = w;
let rotations = [0, 15, 30, 45, 60, 90];
let sizes = [50, 200, 300];
let shapes = ["triangle", "rectangle"];

function setup() {
  createCanvas(w, h);
  // colorMode(HSB, 1, 1, 1, 1);
  angleMode(DEGREES);
  rectMode(CENTER);
  // pixelDensity(1);

  window.canvasColor = color(240);
  window.black = color(25, 23, 11);
  window.white = color(252);
  window.red = color(200, 23, 11);
  window.colors = [black, white, red];
  background(canvasColor);

  const iterations = floor(min(random(1, 6), random(1, 6)));

  bauhaus();
}

function draw() {
  frameRate(1);
  // background(canvasColor);
  // bauhaus();
}

function bauhaus() {
  const iterations = floor(min(random(1, 6), random(1, 6)));

  for (let i = 0; i < iterations; i++) {
    const shapesIndex = floor(random(shapes.length));
    drawShape(shapes[shapesIndex], i);
  }
}

function drawShape(shape, i) {
  const x = (random(w) + random(w)) / 2;
  const y = (random(h) + random(h)) / 2;
  const sizesIndex = floor((random(sizes.length) + random(sizes.length)) / 2);
  const rotationsIndex = floor(random(rotations.length));
  const colorsIndex = floor(
    min((random(colors.length), random(colors.length), random(colors.length)))
  );

  const myColor = colors[colorsIndex];
  const strokeOrFill = random(1) < 0.3;

  let fillColor = "none";
  let strokeColor = "none";
  if (strokeOrFill) {
    strokeColor = myColor;
  } else {
    fillColor = myColor;
  }

  // console.log(x, y, sizes[sizesIndex], rotations[rotationsIndex], shape, shape == 'rectangle');
  if (shape == "triangle") {
    drawTriangle(
      x,
      y,
      sizes[sizesIndex],
      rotations[rotationsIndex],
      fillColor,
      strokeColor,
      2
    );
  } else if (shape == "rectangle") {
    drawRectangle(
      x,
      y,
      sizes[sizesIndex],
      rotations[rotationsIndex],
      fillColor,
      strokeColor,
      2
    );
  }
}

function drawTriangle(cx, cy, size, rotation, myFill, myStroke, myStrokeWidth) {
  push();
  const scale = size;
  translate(cx, cy);

  rotate(180);
  rotate(rotation);

  const x1 = 0 - 0.5 * scale;
  const x2 = 1 * scale - 0.5 * scale;
  const x3 = 0.5 * scale - 0.5 * scale;
  const y1 = 0 - 0.433 * scale;
  const y2 = 0 - 0.433 * scale;
  const y3 = 0.866 * scale - 0.433 * scale;

  if (myFill == "none") {
    console.log("yes");
    noFill();
  } else {
    fill(myFill);
  }
  strokeWeight(myStrokeWidth);
  if (myStroke == "none") {
    noStroke();
  } else {
    stroke(myStroke);
  }

  triangle(x1, y1, x2, y2, x3, y3);
  // Check center
  // strokeWeight(10);
  // stroke(255, 0, 0);
  // point(0, 0);
  pop();
}

function drawRectangle(
  cx,
  cy,
  size,
  rotation,
  myFill,
  myStroke,
  myStrokeWidth
) {
  push();
  translate(cx, cy);
  rotate(rotation);
  let height =
    (random(size * 0.01, size * 0.1) + random(size * 0.01, size * 0.1)) / 3;
  let width = size / height;
  height *= 10;
  width *= 10;

  if (myFill == "none") {
    noFill();
  } else {
    fill(myFill);
  }
  strokeWeight(myStrokeWidth);
  if (myStroke == "none") {
    noStroke();
  } else {
    stroke(myStroke);
  }

  rect(0, 0, height, width);
  pop();
}

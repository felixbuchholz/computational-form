// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js

const w = window.innerWidth;
const h = w;
const inc = 0.01;

function setup() {
  createCanvas(w, h);
  // colorMode(HSB, 1, 1, 1, 1);
  angleMode(DEGREES);
  // rectMode(CENTER);
  pixelDensity(1);

  window.canvasColor = color(226, 226, 226);
  window.black = color(25, 23, 11);
  background(canvasColor);

  prepareCanvas();
  paintSquare();
}

function draw() {}

function prepareCanvas() {
  canvasNoise(27);
}

function canvasNoise(alpha) {
  let yoff = 0;
  loadPixels();
  for (let x = 0; x < w; x++) {
    let xoff = 0;
    for (let y = 0; y < h; y++) {
      var index = (x + y * width) * 4;
      var r = noise(xoff, yoff) * 255;
      // red
      pixels[index + 0] = r;
      // green
      pixels[index + 1] = r;
      // blue
      pixels[index + 2] = r;
      // alpha
      pixels[index + 3] = alpha;

      xoff += inc;
    }
    yoff += inc;
  }
  updatePixels();
}

function noiseSquare() {
  let yoff = 0;
  for (let x = 0; x < w; x++) {
    let xoff = 0;
    for (let y = 0; y < h; y++) {
      var r = noise(xoff, yoff) * 255;
      stroke(r, 15);
      if (x > w * 0.159 && x < w * 0.857 && y > h * 0.151 && y < h * 0.843) {
        point(x, y);
        xoff += inc;
      }
    }
    yoff += inc;
  }
}

function paintSquare() {
  push();
  fill(black);
  rectMode(CORNERS);
  // rect(w * 0.159, h * 0.151, w * 0.857, h * 0.843);
  beginShape();
  vertex(w * 0.159, h * 0.151);
  vertex(w * 0.851, h * 0.143);
  vertex(w * 0.857, h * 0.843);
  vertex(w * 0.164, h * 0.858);
  endShape(CLOSE);
  // noiseSquare();
  sketchyOutline();
  drawScratches();
  pop();
}

function drawScratches() {
  push();
  let gridSize = 20;
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      if (random(1) > 1/gridSize*y) {
        drawBrownianPath(
          w * 0.25 + ((x * w) / gridSize) * 0.52,
          w * 0.25 + ((y * w) / gridSize) * 0.52,
          random(6, 10),
          random(1, 40)
        );
      }
    }
  }
  pop();
}

function sketchyOutline() {
  push();
  let amplitude = 0.05;
  let gran = 80;
  print("yes");
  stroke(black);
  strokeWeight(w * 0.007);
  strokeJoin(ROUND);
  drawSketchyline(
    { x: w * 0.159, y: h * 0.151 },
    { x: w * 0.851, y: h * 0.143 },
    gran,
    amplitude
  );
  drawSketchyline(
    { x: w * 0.851, y: h * 0.143 },
    { x: w * 0.857, y: h * 0.843 },
    gran,
    amplitude
  );
  drawSketchyline(
    { x: w * 0.857, y: h * 0.843 },
    { x: w * 0.164, y: h * 0.858 },
    gran,
    amplitude
  );
  drawSketchyline(
    { x: w * 0.164, y: h * 0.858 },
    { x: w * 0.159, y: h * 0.151 },
    gran,
    amplitude
  );
  pop();
}

function drawSketchyline(point1, point2, granularity, amplitude) {
  const startP = Object.assign({}, point1);
  let nextP = Object.assign({}, point1);
  let prevP = Object.assign({}, point1);
  const endP = Object.assign({}, point2);

  const vector = { x: endP.x - startP.x, y: endP.y - startP.y };
  const pRVector = { x: vector.y, y: -vector.x };
  const pLVector = { x: -vector.y, y: vector.x };
  const steps = granularity * 2;
  const scaleFactor = 1 / steps;
  let randomArray = [];
  for (let i = 0; i < steps / 2; i++) {
    const r = random(1);
    randomArray.push(r);
  }
  randomMinusArray = randomArray.map(x => -x);
  randomArray = randomArray.concat(randomMinusArray);
  randomArray = shuffle(randomArray);
  for (let i = 0; i < steps; i++) {
    nextP.x +=
      vector.x * scaleFactor +
      pRVector.x * scaleFactor * randomArray[0] * amplitude;
    nextP.y +=
      vector.y * scaleFactor +
      pRVector.y * scaleFactor * randomArray[0] * amplitude;
    line(prevP.x, prevP.y, nextP.x, nextP.y);
    prevP.x = nextP.x;
    prevP.y = nextP.y;
    randomArray.splice(0, 1);
  }
}

function drawBrownianPath(x, y, segmentLength, steps) {
  for (var step = 0; step < steps; step++) {
    var nextX, nextY;

    ////////////////////////////////////////////////////////////////////
    // even distribution
    if (step < steps / 2) {
      stroke(min(random(20, 250),random(40, 250)), (step * 255) / steps);
      // console.log((step * 255) / steps);
    } else {
      stroke(min(random(20, 250), random(40, 250)), 255 - (step * 122) / steps);
      // console.log(step, 255 - (step * 255) / steps);
    }
    nextX = x + random(-segmentLength, segmentLength);
    nextY = y + random(-segmentLength, segmentLength);

    line(x, y, nextX, nextY);

    x = nextX;
    y = nextY;
  }
}

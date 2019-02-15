const w = 800;
const h = 800;
const iw = 400;
const ih = 460;

function setup() {
  colorMode(HSB, 1, 1, 1, 1);
  backgroundColor = color(0, 0, 0);
  angleMode(DEGREES);
  createCanvas(w, h);
  background(backgroundColor);
  stroke(0, 0, 1);
}

function draw() {
  frameRate(10);
  background(backgroundColor);
  translate(200, 180);
  // 1
  drawSketchyline({ x: 0, y: ih * 0.25 }, { x: iw * 0.5, y: 0 }, 60, 0.4);
  drawSketchyline(
    { x: 0, y: ih * 0.25 },
    { x: iw * 0.4, y: ih * 0.45 },
    60,
    0.4
  );
  // 2
  drawSketchyline({ x: iw * 0.5, y: 0 }, { x: iw, y: ih * 0.25 }, 60, 0.4);

  // 3
  drawSketchyline({ x: iw, y: ih * 0.25 }, { x: iw, y: ih * 0.75 }, 60, 0.4);
  drawSketchyline(
    { x: iw, y: ih * 0.25 },
    { x: iw * 0.6, y: ih * 0.45 },
    60,
    0.4
  );

  // 4
  drawSketchyline({ x: iw, y: ih * 0.75 }, { x: iw * 0.5, y: ih }, 60, 0.4);
  // 5
  drawSketchyline({ x: iw * 0.5, y: ih }, { x: 0, y: ih * 0.75 }, 60, 0.4);
  drawSketchyline(
    { x: iw * 0.5, y: ih },
    { x: iw * 0.5, y: ih * 0.6 },
    60,
    0.4
  );

  // 6
  drawSketchyline({ x: 0, y: ih * 0.75 }, { x: 0, y: ih * 0.25 }, 60, 0.4);
  for (let i = 0; i < 3; i++) {
    push();
    translate(iw / 2, ih / 2);
    rotate(120*i);
    translate(-iw / 2, -ih / 2);
    drawSketchyline({ x: iw * 0.5, y: ih * 0.10 }, { x: iw * 0.8, y: ih * 0.25 }, 60, 0.4);
    drawSketchyline({ x: iw * 0.8, y: ih * 0.25 }, { x: iw * 0.6, y: ih * 0.35 }, 60, 0.4);
    drawSketchyline({ x: iw * 0.4, y: ih * 0.35 }, { x: iw * 0.2, y: ih * 0.25 }, 60, 0.4);
    drawSketchyline({ x: iw * 0.2, y: ih * 0.25 }, { x: iw * 0.5, y: ih * 0.10 }, 60, 0.4);

    drawSketchyline({ x: iw * 0.3, y: ih * 0.30 }, { x: iw * 0.4, y: ih * 0.25 }, 60, 0.4);
    drawSketchyline({ x: iw * 0.4, y: ih * 0.25 }, { x: iw * 0.4, y: ih * 0.45 }, 60, 0.4);

    drawSketchyline({ x: iw * 0.6, y: ih * 0.25 }, { x: iw * 0.7, y: ih * 0.3 }, 60, 0.4);
    drawSketchyline({ x: iw * 0.6, y: ih * 0.25 }, { x: iw * 0.6, y: ih * 0.45 }, 60, 0.4);

    drawSketchyline({ x: iw * 0.5, y: ih * 0.10 }, { x: iw * 0.5, y: ih * 0.5 }, 60, 0.4);

    pop();
    
  }

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


const w = window.innerWidth;
const h = window.innerHeight;

function setup() {
  colorMode(HSB, 1, 1, 1, 1);
  backgroundColor = color(0.9, 0.1, 0.2);
  textAlign(CENTER);
  createCanvas(w, h);
  background(backgroundColor);
  stroke(0, 0, 1, 0.1);
  drawSketchyline({ x: 90, y: 80 }, { x: 400, y: 400 }, 50, 0.4);
}

function draw() {
  noFill();
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
function mouseClicked() {}

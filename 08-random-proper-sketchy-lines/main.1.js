const w = window.innerWidth;
const h = window.innerHeight;

function setup() {
  colorMode(HSB, 1, 1, 1, 1);
  backgroundColor = color(0, 0, 0.5);
  textAlign(CENTER);
  createCanvas(w, h);
  background(backgroundColor);
  // stroke(0, 0, 1, 1);
  for (let i = 0; i < 100; i++) {
    stroke(0, 0, random(1));
    drawSketchyline(
      { x: i*h/50, y: 0},
      { x: i*h/50, y: h },
      floor(random(4, 100)),
      random(1)
    );
  }
  // drawSketchyline({ x: 50, y: 50 }, { x: 250, y: 350 }, 100, 0.4);
  // drawSketchyline({ x: 150, y: 50 }, { x: 250, y: 350 }, 100, 0.4);
}

function draw() {
  noFill();
}

function drawSketchyline(point1, point2, granularity, amplitude) {
  const startP = Object.assign({}, point1);
  let nextP = Object.assign({}, point1);
  let prevP = Object.assign({}, point1);
  const endP = Object.assign({}, point2);
  // line(startP.x, startP.y, endP.x, endP.y);

  const vector = { x: endP.x - startP.x, y: endP.y - startP.y };
  const pRVector = { x: vector.y, y: -vector.x };
  const pLVector = { x: -vector.y, y: vector.x };
  const steps = granularity * 2;
  const scaleFactor = 1 / steps;
  // stroke(0.4, 1, 1);
  // line(
  //   startP.x,
  //   startP.y,
  //   startP.x + pRVector.x * 0.1,
  //   startP.y + pRVector.y * 0.1
  // );
  // stroke(0.2, 1, 1);
  // line(
  //   startP.x,
  //   startP.y,
  //   startP.x + pLVector.x * 0.1,
  //   startP.y + pLVector.y * 0.1
  // );
  // stroke(0, 1, 1);
  let randomArray = [];
  for (let i = 0; i < steps / 2; i++) {
    const r = random(1);
    randomArray.push(r);
  }
  randomMinusArray = randomArray.map(x => -x);
  randomArray = randomArray.concat(randomMinusArray);
  randomArray = shuffle(randomArray);
  // console.log(randomArray);
  for (let i = 0; i < steps; i++) {
    // const r = floor(random(2)) == 0? 1: -1;
    // const r = i % 2 == 0 ? 1 : -1;
    // console.log(r);
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

  // let p1 = point1;
  // let p2 = point2;
  // p2.x = p1.x;
  // p2.y = p1.y;
  // stroke(0, 1, 1);
  // for (let i = 0; i < granularity; i++) {
  //   p1.x = p2.x;
  //   p1.y = p2.y;
  //   p2.x += vector.x / (granularity + random(-1, 1));
  //   p2.y += vector.y / (granularity + random(-1, 1));

  //   if (i == granularity - 1) {
  //     // this is a bit rough
  //     line(p1.x, p1.y, endP.x, endP.y);
  //   } else {
  //     line(p1.x, p1.y, p2.x, p2.y);
  //   }
  // }
}
function mouseClicked() {}

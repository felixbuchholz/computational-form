// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js
// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.min.js

const w = 500;
const h = w;
const eyeRadius = w * 0.09;
const eyeY = h * 0.43;

// Animation parameters
let tearOffsetStart = h * 0.63;
let tearOffsetEnd = h * 0.45;
let mouthHeightStart = 0.2;
let mouthHeightCurrent = mouthHeightStart;
let mouthHeightEnd = -0.001;
let eyeRotationStart = 45;
let eyeRotationCurrent = eyeRotationStart;
let eyeRotationResta = 0;
let eyeRotationRest = -45;
let eyeRotationEnd = 0;
let eyeOffsetStart = w * 0.085;
let eyeOffsetCurrent = eyeOffsetStart;
let eyeOffsetEnd = 0;
let browsOffsetStart = h * 0.6;
let browsOffsetCurrent = browsOffsetStart;
let browsOffsetRest = h * 0.25;
let browsOffsetEnd = 0;
const keyFrame1 = 200;
const keyFrame2 = 300;
const keyFrame2a = 500;
const keyFrame3 = 750;
const keyFrame4 = 900;
const keyFrame5 = 1000;
let inLove = false;

function setup() {
  createCanvas(w, h);
  angleMode(DEGREES);
  let div0 = createDiv();
  window.valentineSlider = createSlider(1, 1000, 1, 0.0001);
  let question = createP("– <br> Your <br> Valentine’s Day <br> mood? ");
  question.style("font", "900 26px/110% Arial, Helvetica, sans-serif");
  question.style("color", "#ff0000");
  question.style("margin-top", "0");

  valentineSlider.style("width", w + "px");

  window.red = color(255, 0, 0);
  window.white = color(255, 255, 255);

  noStroke();
  fill(red);

  textAlign(CENTER);
  text("Starting…", w / 2, h / 2);
}

function draw() {
  background(red);
  faceShape();

  if (valentineSlider.value() < keyFrame1) {
    let m1 = map(
      valentineSlider.value(),
      0,
      keyFrame1,
      tearOffsetStart,
      tearOffsetEnd
    );
    tear(eyeRadius + eyeOffsetCurrent, m1);
  } else if (valentineSlider.value() > keyFrame1) {
    mouthHeightCurrent = map(
      valentineSlider.value(),
      keyFrame1,
      keyFrame2,
      mouthHeightStart,
      mouthHeightEnd,
      true
    );
    eyeRotationCurrent = map(
      valentineSlider.value(),
      keyFrame1,
      keyFrame2,
      eyeRotationStart,
      eyeRotationResta,
      true
    );
  }
  if (valentineSlider.value() > keyFrame2a) {
    eyeRotationCurrent = map(
      valentineSlider.value(),
      keyFrame2a,
      keyFrame3,
      eyeRotationResta,
      eyeRotationRest,
      true
    );
    browsOffsetCurrent = map(
      valentineSlider.value(),
      keyFrame2a,
      keyFrame3,
      browsOffsetStart,
      browsOffsetRest,
      true
    );
  }
  if (valentineSlider.value() > keyFrame4) {
    if (inLove == false) {
      console.log("So in love!");
      inLove = true;
    }
    eyeRotationCurrent = map(
      valentineSlider.value(),
      keyFrame4,
      keyFrame5,
      eyeRotationRest,
      eyeRotationEnd,
      true
    );
    eyeOffsetCurrent = map(
      valentineSlider.value(),
      keyFrame4,
      keyFrame5,
      eyeOffsetStart,
      eyeOffsetEnd,
      true
    );
    browsOffsetCurrent = map(
      valentineSlider.value(),
      keyFrame4,
      keyFrame5,
      browsOffsetRest,
      browsOffsetEnd,
      true
    );
  }
  eyes(eyeRadius + eyeOffsetCurrent, eyeRotationCurrent);
  mouth();
  brows();
}

function faceShape() {
  push();
  fill(white);
  noStroke();
  circle(w / 2, h / 2, (w / 2) * 0.8);
  pop();
}

function eyes(x, a) {
  push();
  fill(red);
  const x1 = w / 2 - x;
  const x2 = w / 2 + x;
  const y = eyeY;

  push();
  translate(x1, y);
  rotate(a);
  circle(0, 0, eyeRadius);
  rect(0, 0, eyeRadius, eyeRadius);
  circle(0, 0, 1);
  pop();
  push();
  translate(x2, y);
  rotate(-a);
  circle(0, 0, eyeRadius);
  rect(0, 0, -eyeRadius, eyeRadius);
  circle(0, 0, 1);
  pop();
  pop();
}

function mouth() {
  push();
  noFill();
  stroke(red);
  strokeWeight(w * 0.03);
  arc(w / 2, h * 0.7, w * 0.2, h * mouthHeightCurrent, 180, 0);
  pop();
}

function tear(x, y) {
  push();
  push();
  fill(red);
  const x1 = w / 2 - x;
  let r = w * 0.015;

  push();
  translate(x1, y);
  rotate(-135);
  circle(0, 0, r);
  rect(0, 0, r, r);
  pop();
  r = w * 0.009;
  push();
  translate(x1 - w * 0.02, y - w * 0.03);
  rotate(-135);
  circle(0, 0, r);
  rect(0, 0, r, r);
  pop();
  pop();
  pop();
}

function brows(y) {
  push();
  translate(w / 2, eyeY - browsOffsetCurrent);
  triangle(
    -eyeRadius * 1.52,
    eyeRadius - 6,
    0,
    eyeRadius * 2,
    eyeRadius * 1.52,
    eyeRadius - 6
  );
  pop();
}

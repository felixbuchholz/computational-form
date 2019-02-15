// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js
// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.min.js

const w = window.innerWidth;
const h = w;
let rotations = [0, 15, 30, 45, 60, 90];
let sizes = [50, 200, 300];
let types = ["triangle", "rectangle"];
let shapes = [];
let minShapes = 1;
let defaultShapes = 5;
let maxShapes = 12;
let play = true;
let myFR = 60;
let slowestSpeed = 4; // in seconds

function setup() {
  createCanvas(w, h);
  // colorMode(HSB, 1, 1, 1, 1);
  angleMode(DEGREES);
  rectMode(CENTER);
  // pixelDensity(1);

  // Speed
  createP("Speed");
  window.modulusSpeedSlider = createSlider(1, 239, 180);
  // Play / Pause
  window.button = createButton("Pause / Play");
  // button.position(19, 19);
  button.mousePressed(pausePlay);
  // amount of shapes
  createP("Choose amount of shapes:");
  createSpan("min");
  window.minAmountSlider = createSlider(1, 12, 5);
  createSpan("max");
  window.maxAmountSlider = createSlider(1, 12, 5);
  // colors
  createP("Choose a background color:");
  window.colorPickerBG = createInput("#f1f1f1", "color");
  createP("Choose the three shape colors:");
  window.colorPicker1 = createInput("#252525", "color");
  window.colorPicker2 = createInput("#df0000", "color");
  window.colorPicker3 = createInput("#fdfdfd", "color");
  window.colors = [
    colorPicker1.value(),
    colorPicker2.value(),
    colorPicker3.value()
  ];
  // stroke
  createP("Choose strokeWidth:");
  window.strokeWidthSlider = createSlider(1, 7, 2);
  // fill shapes array
  for (let i = 0; i < maxShapes; i++) {
    shapes.push(new RandomShape());
  }
  textAlign(CENTER);
  text("Starting…", w / 2, h / 2);
}

function draw() {
  frameRate(60);
  speedRegulator();
}

function speedRegulator() {
  if (frameCount % (240 - floor(modulusSpeedSlider.value())) == 0) {
    drawContainer();
  }
}

function drawContainer() {
  updateColors();
  if (play == true) {
    randomizeAllShapes();
  }
  const amount = floor(
    random(minAmountSlider.value(), maxAmountSlider.value())
  );
  drawXAmountOfShapes(amount);
}

function pausePlay() {
  if (play == true) {
    document.getElementsByTagName("button").innerHTML = "Play";
    play = false;
  } else {
    document.getElementsByTagName("button").innerHTML = "Pause";
    play = true;
  }
}

function updateColors() {
  background(colorPickerBG.value());
  colors = [colorPicker1.value(), colorPicker2.value(), colorPicker3.value()];
}

function drawXAmountOfShapes(amount) {
  for (let i = 0; i < amount; i++) {
    shapes[i].draw();
  }
}

function randomizeAllShapes() {
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].randomize();
  }
}

class Shape {
  constructor(
    type = "triangle",
    cx = w / 2,
    cy = h / 2,
    width = 100,
    height = 100,
    rotation = 0,
    myFill = "#000000",
    myStroke = "none",
    myStrokeWidth = 2
  ) {
    this.type = type;
    this.cx = cx;
    this.cy = cy;
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.myFill = myFill;
    this.myStroke = myStroke;
    this.myStrokeWidth = myStrokeWidth;
  }
  randomize() {
    // type
    const typesIndex = floor(random(types.length));
    this.type = types[typesIndex];
    // coordinates
    const x = (random(w) + random(w)) / 2;
    const y = (random(h) + random(h)) / 2;
    this.cx = x;
    this.cy = y;
    // size
    const sizesIndex = floor((random(sizes.length) + random(sizes.length)) / 2);
    const size = sizes[sizesIndex];
    let myHeight =
      (random(size * 0.01, size * 0.1) + random(size * 0.01, size * 0.1)) / 2;
    let myWidth = (size / height) * 150;
    this.width = myWidth;
    this.height = sizes[sizesIndex];
    // rotation
    const rotationsIndex = floor(random(rotations.length));
    this.rotation = rotations[rotationsIndex];
    // colors
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
    this.myFill = fillColor;
    this.myStroke = strokeColor;
    this.myStrokeWidth = strokeWidthSlider.value();
  }
  draw() {
    if (this.type == "triangle") {
      drawTriangle(
        this.cx,
        this.cy,
        this.width,
        this.height,
        this.rotation,
        this.myFill,
        this.myStroke,
        this.myStrokeWidth
      );
    } else if (this.type == "rectangle") {
      drawRectangle(
        this.cx,
        this.cy,
        this.width,
        this.height,
        this.rotation,
        this.myFill,
        this.myStroke,
        this.myStrokeWidth
      );
    }
  }
}

class RandomShape extends Shape {
  constructor() {
    super();
    this.randomize();
  }
}

function drawTriangle(
  cx,
  cy,
  width,
  height,
  rotation,
  myFill,
  myStroke,
  myStrokeWidth
) {
  push();
  const size = height;
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
    // console.log("yes");
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
  width,
  height,
  rotation,
  myFill,
  myStroke,
  myStrokeWidth
) {
  push();
  translate(cx, cy);
  rotate(rotation);

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

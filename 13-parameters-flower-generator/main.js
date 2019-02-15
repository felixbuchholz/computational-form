// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js
// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.min.js

const w = window.innerWidth-20;
const h = window.innerHeight * 0.65;  
let myFR = 60;
let slowestSpeed = 4; // in seconds
let myStartSpeed = 0.2; // TODO, make this work!
let play = true;

function setModes() {
  // colorMode(HSB, 1, 1, 1, 1);
  angleMode(DEGREES);
  rectMode(CENTER);
  // pixelDensity(1);
}

function setColors() {
  // colors
  createP("Choose background / stroke color:");
  window.colorPickerBG = createInput("#ffffee", "color");
  window.colorPicker1 = createInput("#df5555", "color");
}

function setSpeed() {
  // Speed
  createP("Speed");
  window.modulusSpeedSlider = createSlider(1, 239, 239);
  // Play / Pause
  window.button = createButton("Pause / Play");
  // button.position(19, 19);
  button.mousePressed(pausePlay);
}

function setStroke() {
  // stroke
  createP("Choose strokeWidth:");
  window.strokeWidthSlider = createSlider(1, 7, 2);
}

function setLengthAndRotation() {
  let div0 = createDiv('');
  div0.child(createP("Choose angle:"));
  div0.child(window.angleSlider = createSlider(0, 360, 110, 0.0001));
  let div1 = createDiv('');
  div1.child(createP("Choose spiraling:"));
  div1.child(window.spiralSlider = createSlider(0, 0.997, 0.989, 0.0001));
  let div2 = createDiv('');
  div2.child(createP("Choose smallest size:"));
  div2.child(window.smallestSizeSlider = createSlider(2, w, 4, 0.0001));
  let div3 = createDiv('');
  div3.child(createP("Choose scale:"));
  div3.child(window.scaleSlider = createSlider(0, h, h / 2, 0.001));
  let div4 = createDiv('');
  div4.child(createP("Choose x:"));
  div4.child(window.xPosSlider = createSlider(0, w, w / 3, 0.001));
  let div5 = createDiv('');
  div5.child(createP("Choose y:"));
  div5.child(window.yPosSlider = createSlider(0, 2 * h, h*0.7, 0.001));
  let div6 = createDiv('');
  div6.child(createP("Choose colors:"));
  div6.child(window.colorPickerBG = createInput("#ffffee", "color"));
  div6.child(window.colorPicker1 = createInput("#df5555", "color"));
  let div7 = createDiv('');
  div7.child(createP("Choose strokeWidth:"));
  div7.child(window.strokeWidthSlider = createSlider(1, 7, 1));

  let div00 = createDiv(''); 
  div00.child(div0.style('padding', `3px`));
  div00.child(div1.style('padding', `3px`));
  div00.child(div2.style('padding', `3px`));
  div00.child(div3.style('padding', `3px`));
  div00.child(div4.style('padding', `3px`));
  div00.child(div5.style('padding', `3px`));
  div00.child(div6.style('padding', `3px`));
  div00.child(div7.style('padding', `3px`));

  div00.style('display', 'flex');
  div00.style('flex-flow', 'row wrap');
  div00.style('border', `1px solid grey`);
  div00.style('padding', `20px`);
  div00.style('margin-top', `10px`);
  div00.style('width', `${w-40}px`);

}

function setup() {
  createCanvas(w, h);
  setLengthAndRotation();
  setModes();
  // setSpeed();
  // setColors();
  // setStroke();
  // Say hi
  textAlign(CENTER);
  text("Starting…", w / 2, h / 2);
}

function draw() {
  frameRate(60);
  // speedRegulator();
  drawContainer();
}

function drawContainer() {
  updateColors();
  if (play == true) {
    doWhilePlay();
  } else {
    doWhilePauseOnly();
  }
  doWhilePause();
}

function doWhilePlay() {
  // noStroke();
  // fill(colorPicker1.value());
  // circle(w / 2, w / 2, 10, 10)
  stroke(colorPicker1.value());
  strokeWeight(strokeWidthSlider.value())
  translate(xPosSlider.value(), yPosSlider.value())
  branch(scaleSlider.value());
}
function doWhilePauseOnly() {
  // console.log('I’m in else');
}

function doWhilePause() {
  // console.log('I’m outside');
}

function speedRegulator() {
  if (frameCount % (240 - floor(modulusSpeedSlider.value())) == 0) {
    drawContainer();
  }
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
}

let myScale = 0.994; // global?

function branch(length) {
  line(0, 0, 0, -length);
  translate(0, -length);
  rotate(angleSlider.value());
  if (length > smallestSizeSlider.value()) {
    branch(length*spiralSlider.value());
  }
}

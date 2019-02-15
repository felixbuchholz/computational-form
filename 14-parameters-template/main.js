// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js
// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.min.js

const w = window.innerWidth;
const h = w;
let myFR = 60;
let slowestSpeed = 4; // in seconds
let play = true;

function setModes() {
  // colorMode(HSB, 1, 1, 1, 1);
  angleMode(DEGREES);
  rectMode(CENTER);
  // pixelDensity(1);
}

function setColors() {
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
}

function setup() {
  createCanvas(w, h);
  setModes();
  setColors();

  // Speed
  createP("Speed");
  window.modulusSpeedSlider = createSlider(1, 239, 180);
  // Play / Pause
  window.button = createButton("Pause / Play");
  // button.position(19, 19);
  button.mousePressed(pausePlay);
  
  // stroke
  createP("Choose strokeWidth:");
  window.strokeWidthSlider = createSlider(1, 7, 2);
  textAlign(CENTER);
  text("Starting…", w / 2, h / 2);
}

function draw() {
  frameRate(60);
  speedRegulator();
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
  push();
  noStroke();
  fill(colorPicker1.value());
  circle(w / 2, w / 2, 10, 10)
  pop();
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
  colors = [colorPicker1.value(), colorPicker2.value(), colorPicker3.value()];
}

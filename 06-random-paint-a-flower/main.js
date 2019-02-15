const w = 400
const h = 800
function setup() {
  // window.cBack = color();
  createCanvas(w, h)
  background(250)
}

function draw() {
  frameRate(15)
  colorMode(HSB, 1)
  stroke(0, random(1), random(1), random(1))
  strokeWeight(random(1, 3))
  if (mouseIsPressed === true) {
    strokeWeight(5,8)
  }
  line(mouseX, mouseY, pmouseX + random(3), pmouseY + random(3))
  noStroke()
  if (frameCount % 3) {
  } else {
    fill(0, random(1), random(1), random(1))
    ellipse(mouseX, mouseY, random(1, 10), random(1, 10))
  }
}

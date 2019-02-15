const tileSize = 30;
const gridW = 20;
const gridH = 30;
const w = gridW * tileSize;
const h = gridH * tileSize;
let tiles = [];
let currentPos = { x: 0, y: 0 };
let index = 0;

const connectFactor = 0.3;
let circleFactor = connectFactor + 0.3;
const offsetCorrection = (tileSize * connectFactor) / 2;

function setup() {
  window.cBack = color(255, 180, 255);
  window.cFront = color(255);
  window.cGrid = color(255);
  createCanvas(w, h);
  background(250);
  grid();
  startLabyrinth();
  drawLabyrinth();
}

function draw() {
  frameRate(20);
  updateLabyrinth();
}

class Tile {
  constructor(x, y, connected) {
    this.x = x * tileSize;
    this.y = y * tileSize;
    this.connected = connected;
    this.draw = function() {
      push();
      angleMode(DEGREES);
      translate(this.x, this.y);
      // translate(tileSize / 2, tileSize / 2);
      // rotate(90 * connects);
      // translate(-tileSize / 2, -tileSize / 2);
      fill(cBack);
      rect(0, 0, tileSize, tileSize);
      fill(cFront);
      // console.log(this.connected.reduce(getSum));
      if (this.connected.reduce(getSum) > 0) {
        ellipse(
          tileSize / 2,
          tileSize / 2,
          tileSize * circleFactor,
          tileSize * circleFactor
        );
      }
      for (let index = 0; index < this.connected.length; index++) {
        if (this.connected[index] == 1) {
          push();
          translate(tileSize / 2, tileSize / 2);
          rotate(90 * index);
          translate(-tileSize / 2, -tileSize / 2);
          rect(
            tileSize / 2 - offsetCorrection,
            0,
            tileSize * connectFactor,
            tileSize / 2
          );
          pop();
        }
      }

      pop();
    };
  }
}

function startLabyrinth() {
  noStroke();
  // first tile
  let initial = [];
  for (let index = 0; index < 4; index++) {
    initial.push(floor(random(2)));
  }
  tiles.push(new Tile(currentPos.x, currentPos.y, initial));
  for (let index = 0; index < 100; index++) {}
}

function updateLabyrinth() {
  let next = [];
  if (floor(random(2)) == 0) {
    // console.log(currentPos);
    let plusOrMinus;
    if (currentPos.x < 1) {
      plusOrMinus = 1;
    } else if (currentPos.x == gridW-1) {
      plusOrMinus = -1;
    } else {
      plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    }
    currentPos.x += plusOrMinus;
    if (plusOrMinus == 1) {
      next[0] = floor(random(2));
      next[1] = floor(random(2));
      next[2] = floor(random(2));
      next[3] = tiles[index].connected[1];
    } else {
      next[0] = floor(random(2));
      next[1] = tiles[index].connected[3];
      next[2] = floor(random(2));
      next[3] = floor(random(2));
    }
  } else {
    let plusOrMinus;
    if (currentPos.y < 1) {
      plusOrMinus = 1;
    } else if (currentPos.y == gridH-1) {
      plusOrMinus = -1;
    } else {
      plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    }
    currentPos.y += plusOrMinus;
    if (plusOrMinus == 1) {
      next[0] = tiles[0].connected[2];
      next[1] = floor(random(2));
      next[2] = floor(random(2));
      next[3] = floor(random(2));
      // circleFactor += 0.01;
    } else {
      next[0] = floor(random(2));
      next[1] = floor(random(2));
      next[2] = tiles[0].connected[0];
      next[3] = floor(random(2));
      // circleFactor -= 0.01;
    }
  }
  tiles.push(new Tile(currentPos.x, currentPos.y, next));
  tiles[1].draw();
  tiles.splice(0, 1);
}

function drawLabyrinth() {
  for (const tile of tiles) {
    tile.draw();
  }
}

function grid() {
  // grid
  for (let index = 0; index < gridW; index++) {
    stroke(cGrid);
    line(index * tileSize, 0, index * tileSize, h);
  }
  for (let index = 0; index < gridH; index++) {
    stroke(cGrid);
    line(0, index * tileSize, w, index * tileSize);
  }
}

// https://www.w3schools.com/jsref/jsref_reduce.asp
function getSum(total, num) {
  return total + num;
}

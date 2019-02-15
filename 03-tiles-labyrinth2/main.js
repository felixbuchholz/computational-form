const tileSize = 40;
const gridW = 20;
const gridH = 20;
const w = gridW * tileSize;
const h = gridH * tileSize;
let tileMatrix = Array(gridW * gridH);
tileMatrix.fill([2, 2, 2, 2]);
let tiles = [];
let currentPos = {
  x: getRandomInt(gridW),
  y: getRandomInt(gridH)
};

let index = 0;
let myStop = false;

const connectFactor = 0.3;
let circleFactor = connectFactor + 0.3;
const offsetCorrection = (tileSize * connectFactor) / 2;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function setup() {
  window.cBack = color(0, 180, 255, 128);
  window.cFront = color(255, 128);
  window.cGrid = color(255);
  createCanvas(w, h);
  background(250);
  grid();
  startLabyrinth();
  drawLabyrinth();
}

function draw() {
  frameRate(20);
  if (myStop == false) {
    moveAround();
  }
}

function stop() {
  myStop = true;
}

class Tile {
  constructor(x, y, connected) {
    this.x = x * tileSize;
    this.y = y * tileSize;
    this.connected = connected;
    this.tileIndex = y * gridW + x;
    tileMatrix[this.tileIndex] = this.connected;
    this.conSum = connected.reduce(getSum);
    // console.log(this.connected, this.conSum, this.tileIndex);
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

      push();
      translate(tileSize / 2, tileSize / 2);
      if (this.conSum == 1) {
        const rotateFactor = this.connected.indexOf(1);
        // console.log(rotateFactor);
        rotate(90 * rotateFactor);
        translate(0, -tileSize / 2);
        arc(0, 0, tileSize, tileSize, 0, 180);
      }
      if (this.conSum == 2) {
        if (this.connected[0] == 1 && this.connected[3] == 1) {
          // rotate(90);
          translate(-tileSize / 2, -tileSize / 2);
          arc(0, 0, 2 * tileSize, 2 * tileSize, 0, 90);
        }
        if (this.connected[0] == 1 && this.connected[1] == 1) {
          rotate(90);
          translate(-tileSize / 2, -tileSize / 2);
          arc(0, 0, 2 * tileSize, 2 * tileSize, 0, 90);
        }
        if (this.connected[1] == 1 && this.connected[2] == 1) {
          rotate(180);
          translate(-tileSize / 2, -tileSize / 2);
          arc(0, 0, 2 * tileSize, 2 * tileSize, 0, 90);
        }
        if (this.connected[2] == 1 && this.connected[3] == 1) {
          rotate(270);
          translate(-tileSize / 2, -tileSize / 2);
          arc(0, 0, 2 * tileSize, 2 * tileSize, 0, 90);
        }
        if (this.connected[0] == 1 && this.connected[2] == 1) {
          // rotate(90);
          translate(0, -tileSize / 2);
          arc(0, 0, tileSize, tileSize, 0, 180);
          translate(0, tileSize);
          rotate(180);
          arc(0, 0, tileSize, tileSize, 0, 180);
        }
        if (this.connected[1] == 1 && this.connected[3] == 1) {
          rotate(90);
          translate(0, -tileSize / 2);
          arc(0, 0, tileSize, tileSize, 0, 180);
          translate(0, tileSize);
          rotate(180);
          arc(0, 0, tileSize, tileSize, 0, 180);
        }
      }
      if (this.conSum == 3) {
        const rotateFactor = this.connected.indexOf(0);
        // console.log(rotateFactor);
        rotate(90 * rotateFactor);
        rotate(180);
        for (let i = 0; i < 3; i++) {
          rotate(90 * i);
          push();
          translate(0, -tileSize / 2);
          arc(0, 0, tileSize, tileSize, 0, 180);
          pop();
        }
      }
      if (this.conSum == 4) {
        translate(-tileSize / 2, -tileSize / 2);
        for (let i = 0; i < 4; i++) {
          translate(tileSize / 2, tileSize / 2);
          rotate(90 * i);
          translate(-tileSize / 2, -tileSize / 2);
          arc(0, 0, tileSize, tileSize, 0, 90);
        }
      }
      pop();
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
  // initial = [1, 1, 1, 1];
  tiles.push(new Tile(currentPos.x, currentPos.y, initial));
  for (let index = 0; index < 100; index++) {}
}

function moveAround() {
  let next = [];
  if (floor(random(2)) == 0) {
    // console.log(currentPos);
    let plusOrMinus;
    if (currentPos.x < 1) {
      plusOrMinus = 1;
    } else if (currentPos.x == gridW - 1) {
      plusOrMinus = -1;
    } else {
      plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    }
    currentPos.x += plusOrMinus;
  } else {
    let plusOrMinus;
    if (currentPos.y < 1) {
      plusOrMinus = 1;
    } else if (currentPos.y == gridH - 1) {
      plusOrMinus = -1;
    } else {
      plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    }
    currentPos.y += plusOrMinus;
  }
  next = getNextArray();
  tiles.push(new Tile(currentPos.x, currentPos.y, next));
  tiles[1].draw();
  tiles.splice(0, 1);
}

function getNextArray() {
  let next = [2, 2, 2, 2];
  const abovePosition = { x: currentPos.x, y: currentPos.y - 1 };
  // console.log(currentPos, abovePosition, getTileIndex(abovePosition));
  const belowPosition = { x: currentPos.x, y: currentPos.y + 1 };
  const leftPosition = { x: currentPos.x - 1, y: currentPos.y };
  const rightPosition = { x: currentPos.x + 1, y: currentPos.y };
  const myPositions = [
    abovePosition,
    belowPosition,
    leftPosition,
    rightPosition
  ];

  let myTileIndicies = myPositions.map(x => {
    let tileIndex = getTileIndex(x);
    if (tileIndex < 0 || tileIndex > tileMatrix.length - 1) {
      tileIndex = floor(random(tileMatrix.length - 2));
    }
    return tileIndex;
  });
  // console.log(myTileIndicies);

  const myTileConnections = myTileIndicies.map(x => tileMatrix[x]);

  next[3] = myTileConnections[2][1];
  next[2] = myTileConnections[1][0];
  next[1] = myTileConnections[3][3];
  next[0] = myTileConnections[0][2];

  // next[2] = myTileConnections[0][0];
  // next[2] = myTileConnections[1][1];
  // next[1] = myTileConnections[3][3];

  // console.log(myTileConnections);
  // console.log(next);

  // next = next.map(x => (x == 2 ? (x = floor(random(2))) : x));
  next = next.map(x => {
    if (x == 2) {
      const randomNumber = random(10);
      if (randomNumber < 4) {
        x = 0;
      } else {
        x = 1;
      }
    }
    return x;
  });
  // console.log(next);

  return next;
}

function getTileIndex(posObj) {
  tileIndex = posObj.y * gridW + posObj.x;
  // console.log(tileIndex);
  return tileIndex;
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

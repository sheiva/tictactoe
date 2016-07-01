var canvasSize = 500;
var pad = canvasSize / 10;


function setup() {
  createCanvas(canvasSize, canvasSize);
}

function draw() {
  background(0);
  displaySquareCorner(0, 0, canvasSize / 3);
  displaySquareCenter(canvasSize / 2, canvasSize / 2, canvasSize / 3);

}


function displaySquareCorner(x, y, squareSize) {
  strokeWeight(1);
  stroke(255, 0, 0);
  fill(0)
  rect(x, y, squareSize, squareSize);
  stroke(255);
  strokeWeight(squareSize / 8);
  ellipse(x + (squareSize / 2), y + (squareSize / 2), squareSize - pad, squareSize - pad);
  strokeWeight(squareSize / 8);
  line(x + pad, y + pad, (x + squareSize) - pad, (y + squareSize) - pad);
  line((x + squareSize) - pad, y + pad, x + pad, (y + squareSize) - pad);
  //show "0,0" with a green square:
  stroke(0, 255, 0);
  fill(0, 255, 0);
  strokeWeight(1);
  rect(x, y, 12, 12);
}

function displaySquareCenter(x, y, squareSize) {
  rectMode(CENTER);
  strokeWeight(1);
  stroke(255, 0, 0);
  fill(0)
  rect(x, y, squareSize, squareSize);
  stroke(255);
  strokeWeight(squareSize / 8);
  ellipse(x, y, squareSize - pad, squareSize - pad);
  strokeWeight(squareSize / 8);
  line(x - (squareSize / 2) + pad, y - (squareSize / 2) + pad, x + (squareSize / 2) - pad, y + (squareSize / 2) - pad);
  line(x + (squareSize / 2) - pad, y - (squareSize / 2) + pad, x - (squareSize / 2) + pad, y + (squareSize / 2) - pad);
  //show "0,0" with a green square:
  stroke(0, 255, 0);
  fill(0, 255, 0);
  strokeWeight(1);
  rect(x, y, 12, 12);
}
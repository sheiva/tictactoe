var canvasSize = 500
//var rectSize = canvasSize/3 -10;
var rectSize = canvasSize/3 -5;

function setup() {
  createCanvas(canvasSize, canvasSize);
}

function draw() {
  background(0);
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      fill(255);
      stroke(0,255,255);
      strokeWeight(3);
      rect((canvasSize / 3)*i, (canvasSize / 3)*j, rectSize, rectSize);
    }
  }
}
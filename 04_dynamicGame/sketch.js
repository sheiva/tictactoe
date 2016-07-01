var ticTacSquare = 400;
var sidePadding = 100;
var topPadding = 150;
var ticTacSquareX = sidePadding / 2;
var padding;
var canvasSizeWidth = ticTacSquare + sidePadding;
var canvasSizeHeight = ticTacSquare + topPadding*2;
var thickstroke;
var squareSize = ticTacSquare / 3;
var developerMode = false;

var squares = [];
var playerTurn = 1;

function setup() {
  println("Hello World!")
  createCanvas(canvasSizeWidth, canvasSizeHeight);
  for (i=0; i<3;i++){
    for(j=0;j<3;j++){
      squares[j+(3*i)] = new Square(ticTacSquareX + squareSize * i, topPadding + squareSize * j);
      println(j+(3*i));
    }
  }
  println(squares[0]);
  println(squares[1]);
}

function draw() {
  background(0);
  for (i = 0; i < squares.length; i++) {
    squares[i].displaySquareCorner(squares[i].x, squares[i].y, squareSize);
  }
  if (developerMode === true){
  stroke(255, 0, 0);
  strokeWeight(4);
  noFill();
  rect(ticTacSquareX, topPadding, ticTacSquare, ticTacSquare);
  }
  theGrid.drawGrid();
}

function mousePressed() {
  for (i = 0; i < squares.length; i++) {
    squares[i].clickedSquare();
  }
}

function Square(x, y) {
  this.x = x;
  this.y = y;
  this.pad = squareSize/6;
  this.squareTaken = false;
  this.displayX = false;
  this.displayO = false;
  this.developerMode = developerMode;
  this.displayXStroke = 0;
  this.displaySquareOutline = true;
  this.displaySquareOutlineStroke = 1;
  this.displaySquareCorner = function(x, y, squareSize) {
    thickstroke = squareSize / 9;
    this.x = x;
    this.y = y;
    if (developerMode === false){
    this.displaySquareOutlineStroke = 0;
    strokeWeight(this.displaySquareOutlineStroke);
    stroke(255, 0, 0);
    }
    else{
    this.displaySquareOutlineStroke = 1;
    strokeWeight(this.displaySquareOutlineStroke);
    stroke(255, 0, 0);  
    }
    fill(0);
    rect(x, y, squareSize, squareSize);
    // check if showing circle
    if (this.displayO === true) {
      stroke(255);
      strokeWeight(thickstroke);
      ellipse(x + (squareSize / 2), y + (squareSize / 2), squareSize - (this.pad*1.5), squareSize - (this.pad*1.5));
    } else {
      stroke(255);
      strokeWeight(0);
      ellipse(x + (squareSize / 2), y + (squareSize / 2), squareSize - this.pad, squareSize - this.pad);
    }
    // check if showing "X"
    if (this.displayX === true) {
      strokeWeight(thickstroke);
      line((x + squareSize) - this.pad, y + this.pad, x + this.pad, (y + squareSize) - this.pad)
      line(x + this.pad, y + this.pad, (x + squareSize) - this.pad, (y + squareSize) - this.pad)
    } else {
      strokeWeight(0);
      line(x + this.pad, y + this.pad, (x + squareSize) - this.pad, (y + squareSize) - this.pad)
      line((x + squareSize) - this.pad, y + this.pad, x + this.pad, (y + squareSize) - this.pad)
    }
  };
  this.clickedSquare = function() {
    // calculating the center of the square to see if mouse click is inside the square
    var d = dist(mouseX, mouseY, this.x + squareSize / 2, this.y + squareSize / 2);
    if (d < squareSize / 2) {
      // check and change the state of the square:
      if (this.squareTaken === true) {
        println("This square is taken, friend!");
      } else if (this.squareTaken === false && playerTurn === 1) {
        this.displayX = true;
        this.displayO = false;
        println("It was player " + playerTurn + "'s turn, but, now...");
        playerTurn = 2;
        println("It's player " + playerTurn + "'s turn!");
        // comment out next two lines to test out condition & player switch
        this.squareTaken = true;
        println("This square is taken = " + this.squareTaken);
      } else if (this.squareTaken === false && playerTurn === 2) {
        this.displayX = false;
        this.displayO = true;
        println("It was player " + playerTurn + "'s turn, but, now...");
        playerTurn = 1;
        println("It's player " + playerTurn + "'s turn!");
        // comment out next two lines to test out condition & player switch
        this.squareTaken = true;
        println("This square is taken = " + this.squareTaken);
      } else {
        // println("I'm not sure what's happening!");
      }
    } else {
      // println("I'm not sure what's happening!");
    }
    // umcomment for testing:
    // println(this.x)
    // println(d)

  }
}

var theGrid = {
  drawGrid: function(){
  stroke(255);
  strokeWeight(2);
  noFill();
  line(ticTacSquareX+squareSize, topPadding,ticTacSquareX+squareSize, topPadding +ticTacSquare);
  line(ticTacSquareX+squareSize*2, topPadding,ticTacSquareX+squareSize*2, topPadding +ticTacSquare);
  line(ticTacSquareX, topPadding+squareSize, ticTacSquareX+squareSize*3, topPadding+squareSize);
  line(ticTacSquareX, topPadding+squareSize*2, ticTacSquareX+squareSize*3, topPadding+squareSize*2);
  }
}
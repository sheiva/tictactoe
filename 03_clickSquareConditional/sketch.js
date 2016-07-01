var ticTacSquare = 500;
var thickstroke;
var squareSize = ticTacSquare / 3;

var squares = [];
var playerTurn = 1;

function setup() {
  println("Hello World!")
  createCanvas(ticTacSquare, ticTacSquare);
  //hard-coded test for two squares
  squares[0] = new Square(50, 50);
  squares[1] = new Square(250, 250);
  println(squares[0]);
  println(squares[1]);
}

function draw() {
  background(0);
  //hard-coded test for two squares
  squares[0].displaySquareCorner(squares[0].x, squares[0].y, squareSize);
  squares[1].displaySquareCorner(squares[1].x, squares[1].y, squareSize);
}

function mousePressed() {
  //hard-coded test for two squares
  squares[0].clickedSquare();
  squares[1].clickedSquare();
}

function Square(x, y) {
  this.x = x;
  this.y = y;
  this.pad = ticTacSquare / 20;
  this.squareTaken = false;
  this.displayX = false;
  this.displayO = false;
  this.developerMode = true;
  this.displayXStroke = 0;
  this.displaySquareOutline = true;
  this.displaySquareOutlineStroke = 1;
  this.displaySquareCorner = function(x, y, squareSize) {
    thickstroke = squareSize / 9;
    this.x = x;
    this.y = y;
    strokeWeight(this.displaySquareOutlineStroke);
    stroke(255, 0, 0);
    fill(0)
    rect(this.x, this.y, squareSize, squareSize);
    // check if showing circle
    if (this.displayO === true) {
      stroke(255);
      strokeWeight(thickstroke);
      ellipse(x + (squareSize / 2), y + (squareSize / 2), squareSize - this.pad, squareSize - this.pad);
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
    println(this.x)
    println(d)

  }
}
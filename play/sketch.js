var ticTacSquare = 300;
var sidePadding = ticTacSquare / 4;
var topPadding = ticTacSquare / 2.5; // padding at top for text instructions
var youWinState = false; // game over state
var endGame = false; // end all the loops
var endTie = false; // is it a tie?

//size it, make it pretty
var ticTacSquareX = sidePadding / 2;
var canvasSizeWidth = ticTacSquare + sidePadding;
var canvasSizeHeight = ticTacSquare + topPadding * 2;
var thickstroke;
var squareSize = ticTacSquare / 3;

//test it
var developerMode = false;

//store it
var squares = [];
var grids = [];
var playerTurn = 1;

function setup() {
  createCanvas(canvasSizeWidth, canvasSizeHeight);
  //create the main grid and all the squares
  grids[0] = new TicTacSquare();
  grids[0].createAllTheSquares();
}

function draw() {
  background(0);
  //text instructions
  displayText();
  //tic tac toe grid
  grids[0].drawAllTheSquares();
  grids[0].checkDeveloperMode();
  grids[0].drawGrid();
  //check the win state!
  grids[0].checkWinState();
  if (youWinState === true) {
    grids[0].youWin();
  }
}

function mousePressed() {
  for (i = 0; i < squares.length; i++) {
    squares[i].clickedSquare();
  }
}

function keyTyped() {
  // not working
  if (key === 'd' && developerMode === false) {
    developerMode = true;
    println("Developer Mode is on");
  } else if (key === 'd' && developerMode === true) {
    developerMode = false;
    println("Developer Mode is off");
  }
}

function displayText(){
  textSize(ticTacSquare/10);
  textAlign(CENTER);
  textFont("Georgia");
  if (endGame === false && youWinState === false) {
    s = "It's Player " + playerTurn + "'s turn!";
  } else if (endTie === false && endGame === true && youWinState === true && playerTurn ===1) {
    s = "Player 2 wins!"
  } else if (endTie === false && endGame === true && youWinState === true && playerTurn ===2) {
    s = "Player 1 wins!"
  } else {
    s = "It's a tie!"
  }
  text(s, ticTacSquareX, topPadding / 3, ticTacSquare, ticTacSquare);
}

function Square(x, y) {
  this.x = x;
  this.y = y;
  this.pad = squareSize / 6;
  this.squareTaken = false;
  this.displayX = false;
  this.displayO = false;
  this.developerMode = developerMode;
  this.displayXStroke = 0;
  this.displaySquareOutline = true;
  this.displaySquareOutlineStroke = 1;
  this.displaySquareCorner = function(x, y, squareSize) {
    thickstroke = squareSize / 10;
    this.x = x;
    this.y = y;
    if (developerMode === false) {
      this.displaySquareOutlineStroke = 0;
      strokeWeight(this.displaySquareOutlineStroke);
      stroke(255, 0, 0);
    } else {
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
      ellipse(x + (squareSize / 2), y + (squareSize / 2), squareSize - (this.pad * 1.5), squareSize - (this.pad * 1.5));
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
      } else if (this.squareTaken === false && playerTurn === 1 && youWinState === false) {
        this.displayX = true;
        this.displayO = false;
        println("It was player " + playerTurn + "'s turn, but, now...");
        playerTurn = 2;
        println("It's player " + playerTurn + "'s turn!");
        // comment out next two lines to test out condition & player switch
        this.squareTaken = true;
        // println("This square is taken = " + this.squareTaken);
      } else if (this.squareTaken === false && playerTurn === 2 && youWinState === false) {
        this.displayX = false;
        this.displayO = true;
        println("It was player " + playerTurn + "'s turn, but, now...");
        playerTurn = 1;
        println("It's player " + playerTurn + "'s turn!");
        // comment out next two lines to test out condition & player switch
        this.squareTaken = true;
        // println("This square is taken = " + this.squareTaken);
      } else {
        // println("I'm not sure what's happening!");
      }
    } else {
      // println("I'm not sure what's happening!");
    }


  }
}

function TicTacSquare() {
  this.createAllTheSquares = function() {
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        squares[j + (3 * i)] = new Square(ticTacSquareX + squareSize * i, topPadding + squareSize * j);
      }
    }
  }
  this.drawAllTheSquares = function() {
    for (i = 0; i < squares.length; i++) {
      squares[i].displaySquareCorner(squares[i].x, squares[i].y, squareSize);
    }
  }
  this.checkDeveloperMode = function() {
    if (developerMode === true) {
      stroke(255, 0, 0);
      strokeWeight(4);
      noFill();
      rect(ticTacSquareX, topPadding, ticTacSquare, ticTacSquare);
    }
    else{
      strokeWeight(0);
    }
  }
  this.checkWinState = function() {
    if (squares[0].displayX === true && squares[1].displayX === true && squares[2].displayX === true && endGame === false) {
      println("PLAYER 1 WINS!");
      youWinState = true;
      endGame = true;
    }
    if (squares[3].displayX === true && squares[4].displayX === true && squares[5].displayX === true && endGame === false) {
      println("PLAYER 1 WINS!");
      youWinState = true;
      endGame = true;
    }
    if (squares[6].displayX === true && squares[7].displayX === true && squares[8].displayX === true && endGame === false) {
      println("PLAYER 1 WINS!");
      youWinState = true;
      endGame = true;
    }
    if (squares[0].displayX === true && squares[3].displayX === true && squares[6].displayX === true && endGame === false) {
      println("PLAYER 1 WINS!");
      youWinState = true;
      endGame = true;
    }
    if (squares[1].displayX === true && squares[4].displayX === true && squares[7].displayX === true && endGame === false) {
      println("PLAYER 1 WINS!");
      youWinState = true;
      endGame = true;
    }
    if (squares[2].displayX === true && squares[5].displayX === true && squares[8].displayX === true && endGame === false) {
      println("PLAYER 1 WINS!");
      youWinState = true;
      endGame = true;
    }
    if (squares[0].displayX === true && squares[4].displayX === true && squares[8].displayX === true && endGame === false) {
      println("PLAYER 1 WINS!");
      youWinState = true;
      endGame = true;
    }
    if (squares[2].displayX === true && squares[4].displayX === true && squares[6].displayX === true && endGame === false) {
      println("PLAYER 1 WINS!");
      youWinState = true;
      endGame = true;
    }
    //check win state of O or Player 2
    if (squares[0].displayO === true && squares[1].displayO === true && squares[2].displayO === true && endGame === false) {
      println("PLAYER 2 WINS!");
      youWinState = true;
      endGame = true;
    }
    if (squares[3].displayO === true && squares[4].displayO === true && squares[5].displayO === true && endGame === false) {
      println("PLAYER 2 WINS!");
      youWinState = true;
      endGame = true;
    }
    if (squares[6].displayO === true && squares[7].displayO === true && squares[8].displayO === true && endGame === false) {
      println("PLAYER 2 WINS!");
      youWinState = true;
      endGame = true;
    }
    if (squares[0].displayO === true && squares[3].displayO === true && squares[6].displayO === true && endGame === false) {
      println("PLAYER 2 WINS!");
      youWinState = true;
      endGame = true;
    }
    if (squares[1].displayO === true && squares[4].displayO === true && squares[7].displayO === true && endGame === false) {
      println("PLAYER 2 WINS!");
      youWinState = true;
      endGame = true;
    }
    if (squares[2].displayO === true && squares[5].displayO === true && squares[8].displayO === true && endGame === false) {
      println("PLAYER 2 WINS!");
      youWinState = true;
      endGame = true;
    }
    if (squares[0].displayO === true && squares[4].displayO === true && squares[8].displayO === true && endGame === false) {
      println("PLAYER 2 WINS!");
      youWinState = true;
      endGame = true;
    }
    if (squares[2].displayO === true && squares[4].displayO === true && squares[6].displayO === true && endGame === false) {
      println("PLAYER 2 WINS!");
      youWinState = true;
      endGame = true;
    }
    if (squares[0].squareTaken === true && squares[1].squareTaken && squares[2].squareTaken && squares[3].squareTaken && squares[4].squareTaken && squares[5].squareTaken && squares[6].squareTaken && squares[7].squareTaken && squares[8].squareTaken && youWinState === false) {
      println("It's a tie!");
      youWinState = true
      endGame = true;
      endTie = true;
    } else {
      // comment for fun debugging
      // println("Keep the gaming going gurl.");
    }
  }
  this.youWin = function() {
    fill(0, 0, 0, 200);
    stroke(0, 0, 0, 200);
    rect(ticTacSquareX, topPadding, ticTacSquare, ticTacSquare);
    fill(255,0,0);
    textSize(30);
    textAlign(CENTER);
    textFont("Georgia");
    s = "Player " + playerTurn + " wins!"
  }
  this.drawGrid = function() {
    stroke(255);
    strokeWeight(2);
    noFill();
    line(ticTacSquareX + squareSize, topPadding, ticTacSquareX + squareSize, topPadding + ticTacSquare);
    line(ticTacSquareX + squareSize * 2, topPadding, ticTacSquareX + squareSize * 2, topPadding + ticTacSquare);
    line(ticTacSquareX, topPadding + squareSize, ticTacSquareX + squareSize * 3, topPadding + squareSize);
    line(ticTacSquareX, topPadding + squareSize * 2, ticTacSquareX + squareSize * 3, topPadding + squareSize * 2);
  }
}
(function() {

  /**
   * get requestAnimFrame
   * @default  is settimeout function
   * @attribute cb
   * @type {function}
   * @return {function}
   */
  var requestAnimFrame = (function(cb) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  /**
   * Co-ordinate of Point
   * @param {Number} x x value of co-ordinate
   * @param {Number} y y value of co-ordinate
   */
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * @constructor
   *
   * @param {Object} config configuration object to create snake
   */
  function Snake(config) {
    this._strength = config.strength || 1;

    //for sake of simplicity, lets keep speed as 30
    this._speed = 30;
    if (!config.canvas) {
      throw new Error("Snake need body");
    }
    //canvas element where snake will live
    this._canvas = config.canvas;
    this._color = "#F00";
    this._width = "10px";
    this._height = "10px";
    this._start = []
  }

  /**
   * update strength of snake
   *
   * @api @public
   *
   * @return {void}
   */
  Snake.prototype.updateStrength = function() {

  }

  /**
   * check wheather snake is collide with wall or not
   * @return {Boolean}
   */
  Snake.prototype.isCollision = function() {

  }

  /**
   * draw snake
   * @return {void}
   */
  Snake.prototype.draw = function() {
    this._canvas.beginPath();
    this._canvas.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
    this._canvas.fillStyle = '#8ED6FF';
    this._canvas.fill();
    this._canvas.lineWidth = myRectangle.borderWidth;
    this._canvas.strokeStyle = 'black';
    this._canvas.stroke();
  }

  /**
   * eat food
   * @return {void} eat food
   */
  Snake.prototype.eat = function() {

  }

  /**
   * @constructor
   * @param {Object} canvas context of board
   */
  function Food(canvas) {
    this._canvas = canvas;
    this._food = null;
  }

  /**
   * draw food
   * @return {void}
   */
  Food.prototype.draw = function() {

  }

  /**
   * Main Game object
   * @type {Object}
   */
  var game = {
    animate: function animate() {

    },
    changeDirection: function changeDirection() {

    },
    start: function start() {

    }
  }



  function drawRectangle(myRectangle, context) {
    context.beginPath();
    context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
    context.fillStyle = '#8ED6FF';
    context.fill();
    context.lineWidth = myRectangle.borderWidth;
    context.strokeStyle = 'black';
    context.stroke();
  }

  function animate(myRectangle, canvas, context, startTime) {
    // update
    var time = (new Date()).getTime() - startTime;

    var linearSpeed = 100;
    // pixels / second
    var newX = linearSpeed * time / 1000;

    if (newX < canvas.width - myRectangle.width - myRectangle.borderWidth / 2) {
      myRectangle.x = newX;
    }

    // clear
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRectangle(myRectangle, context);

    // request new frame
    requestAnimFrame(function() {
      animate(myRectangle, canvas, context, startTime);
    });
  }
  var canvas = document.getElementById('play');
  var context = canvas.getContext('2d');

  var myRectangle = {
    x: 0,
    y: 75,
    width: 100,
    height: 50,
    borderWidth: 5
  };

  drawRectangle(myRectangle, context);

  // wait one second before starting animation
  setTimeout(function() {
    var startTime = (new Date()).getTime();

    animate(myRectangle, canvas, context, startTime);
  }, 1000);

})(this)

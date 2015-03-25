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
    this._context = config.context;
    this._color = "#F00";
    this._width = 10;
    this._height = 10;
    this.movement = '_RIGHT';
    this._point = {
      x: 0,
      y: 0
    }
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
  Snake.prototype._draw = function() {
    this._context.fillStyle = this._color;
    for (var i = 0; i < this._strength; i++) {
      this._context.fillRect(this._point.x, this._point.y, this._width, this._height);
    }
  }

  /**
   * eat food
   * @return {void} eat food
   */
  Snake.prototype.eat = function() {
    this._context.clearRect(this._point.x, this._point.y, 10, 10);
  }

  Snake.prototype._LEFT = function(point) {
    if (this._point.x > this._width) {
      this._point.x--;
    }
  }

  Snake.prototype._RIGHT = function() {
    if (this._point.x < this._canvas.width - this._width) {
      this._point.x++;
    }
  }

  Snake.prototype._TOP = function(point) {
    if (this._point.y > this._height) {
      this._point.y--;
    }
  }

  Snake.prototype._BOTTOM = function() {
    if (this._point.y < this._canvas.height - this._height) {
      this._point.y++;
    }
  }


  /**
   * [walk description]
   * @return {[type]} [description]
   */
  Snake.prototype.walk = function(time) {

    //calculate next position
    this[this.movement]();

    // clear
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

    //draw snake
    this._draw();
  }

  /**
   * @constructor
   * @param {Object} canvas context of board
   */
  function Food(config) {
    this._canvas = config.canvas;
    this._context = config.context;
    this._height = 10;
    this._width = 10;
    this._color = "#0F0";
    this._point = {};
  }

  /**
   * [create description]
   * @return {[type]} [description]
   */
  Food.prototype.create = function() {
    this._point.x = Math.floor(Math.random() * (this._canvas.width - 0 + 1)) + 0;
    this._point.y = Math.floor(Math.random() * (this._canvas.height - 0 + 1)) + 0;
  }

  /**
   * draw food
   * @return {void}
   */
  Food.prototype.draw = function() {
    this._context.fillStyle = this._color;
    this._context.fillRect(this._point.x, this._point.y, this._width, this._height);
  }

  /**
   * Main Game object to control event handling and
   * @type {Object}
   */
  var game = {
    /**
     * init game
     * @param  {String} canvasId html id attribute
     * @return {void}
     */
    init: function init(canvasId) {
      this.canvas = document.getElementById('play');
      this.context = this.canvas.getContext('2d');

      var conObj = {
        canvas: this.canvas,
        context: this.context
      }

      this.snake = new Snake(conObj);
      this.food = new Food(conObj);
      this.food.create();
      this.bindKeyPress();
      this.animate();
    },

    /**
     * loop back animate function
     */
    animate: function animate() {

      this.snake.walk();
      if (this.snake._point.x === this.food._point.x &&
        this.snake._point.y === this.food._point.y) {
        this.snake.eat();
        this.food.create();
      }
      this.food.draw();

      // request new frame
      requestAnimFrame(function() {
        this.animate();
      }.bind(this));
    },
    /**
     * Bind event for arrow keys
     */
    bindKeyPress: function() {
      var self = this;
      var keyBinding = function(e) {
        e = e || window.event;

        if (e.keyCode == '38') {
          // up arrow
          if (self.snake.movement === "_LEFT" || self.snake.movement === "_RIGHT") {
            self.snake.movement = '_TOP';
            self.snake.change();
          }
        } else if (e.keyCode == '40') {
          // down arrow
          if (self.snake.movement === "_LEFT" || self.snake.movement === "_RIGHT") {
            self.snake.movement = '_BOTTOM';
            self.snake.change();
          }
        } else if (e.keyCode == '37') {
          // left arrow
          if (self.snake.movement === "_TOP" || self.snake.movement === "_BOTTOM") {
            self.snake.movement = '_LEFT';
            self.snake.change();
          }
        } else if (e.keyCode == '39') {
          // right arrow
          if (self.snake.movement === "_TOP" || self.snake.movement === "_BOTTOM") {
            self.snake.movement = '_RIGHT';
            self.snake.change();
          }
        }
      }
      document.onkeydown = keyBinding;
    }
  }

  setTimeout(function() {
    game.init();
  }, 1000)

})(this)

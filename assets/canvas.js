var numBalls;
var spring = .6;
// FRICTION: between 0 and 1. 1 is no friction.
var friction = .85;
var dragging = false;
var ballDiameter = 50;
var ballColor = '#dddddd';
var dragged;
var balls = [];
var mx;
var my;
var pmx;
var pmy;
var gameWidth;
var gameHeight;

$(document).ready(function() {
  $(window).on('resize', function(e) {
    if ($(window).width() > 400) {
      setup();
    }
  });
});

function setup() {
  gameWidth = $(window).width();
  if ($(window).width() > 400) {
    gameHeight = $(document).height();
  } else {
    gameHeight = $(document).height() + 100;
  }
  canvas = createCanvas(gameWidth, gameHeight);
  canvas.parent('canvas');
  balls = [];
  numBalls = map(gameWidth, 0, 10000, 15, 60);
  for (var i = 0; i < numBalls; i++) {
    var x = random(gameWidth);
    var y = random(gameHeight);
    var d = ballDiameter;
    balls.push(new Ball(x, y, d, i, balls));
  }
  noStroke();
}

function draw() {
  clear();
  for (let ball of balls) {
    // ball.drag();
    ball.collide();
    ball.move();
    ball.display();
  }
  mx = mouseX;
  pmx = pmouseX;
  my = mouseY;
  pmy = pmouseY;
}

function mouseReleased() {
  let mouseV = createVector(mx, my);
  let pmouseV = createVector(pmx, pmy);
  let dir = p5.Vector.sub(mouseV, pmouseV);
  if (dragging == true) {
    balls[dragged].setvx(dir.x);
    balls[dragged].setvy(dir.y);
  }
  dragging = false;
}

function Ball(x, y, diameter, index, others) {
  var vx = 0;
  var vy = 0;

  this.drag = function() {
    var disX = x - mouseX;
    var disY = y - mouseY;
    if (sqrt(sq(disX) + sq(disY)) < diameter / 2) {
      cursor(MOVE);
    }
    if (dragging == true) {
      $('body').css('overflow', 'hidden');
    } else {
      $('body').css('overflow', 'auto');
    }
    if (dragging == false || dragged == index) {
      if (sqrt(sq(disX) + sq(disY)) < diameter / 2 && mouseIsPressed == true) {
        dragged = index;
        dragging = true;      }
    }
    if (dragging == true && dragged == index) {
      x = mouseX;
      y = mouseY;
    }
  }

  this.collide = function() {
    // check other balls
    for (var i = index + 1; i < numBalls; i++) {
      var dx = others[i].x() - x;
      var dy = others[i].y() - y;
      var distance = sqrt(dx * dx + dy * dy);
      var minDist = (others[i].diameter() / 2) + (diameter / 2);
      if (distance < minDist) {
        let angle = atan2(dy, dx);
        var targetX = x + cos(angle) * minDist;
        var targetY = y + sin(angle) * minDist;
        var ax = (targetX - others[i].x()) * spring;
        var ay = (targetY - others[i].y()) * spring;
        vx -= ax;
        vy -= ay;
        others[i].setvx(others[i].vx() + ax);
        others[i].setvy(others[i].vy() + ay);
      }
    }
  }

  this.move = function() {
    if (index == 0) {
      x = mouseX;
      y = mouseY;
    } else {
      vx *= friction;
      vy *= friction;
      x += vx;
      y += vy;
      if (x + diameter / 2 > gameWidth) {
        x = gameWidth - diameter / 2;
        vx *= (-1*spring);
      } else if (x - diameter / 2 < 0) {
        x = diameter / 2;
        vx *= (-1*spring);
      }
      if (y + diameter / 2 > gameHeight) {
        y = gameHeight - diameter / 2;
        vy *= (-1*spring);
      } else if (y - diameter / 2 < 0) {
        y = diameter / 2;
        vy *= (-1*spring);
      }
    }
  }

  this.display = function() {
    if (index == 0) {
      noFill();
      noStroke();
    } else {
      // fill(ballColor);
      stroke('#000000');
    }
    ellipse(x, y, diameter, diameter);
  }

  this.diameter = function() {
    return diameter;
  }

  this.x = function() {
    return x;
  }

  this.y = function() {
    return y;
  }

  this.vx = function() {
    return vx;
  }

  this.vy = function() {
    return vy;
  }

  this.setvx = function (i) {
    vx = i;
  }

  this.setvy = function (i) {
    vy = i;
  }

}

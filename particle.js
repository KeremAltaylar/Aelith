function Particle(r, g, b, x, y, stw, spd) {
  this.xpos = x;
  this.ypos = y;
  this.pos = createVector(this.xpos, this.ypos);
  this.vel = createVector(10, 10);
  this.acc = createVector(10, 10);
  this.maxspeed = spd;
  this.prevPos = this.pos.copy();

  this.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0.1);
  };

  this.applyForce = function (force) {
    this.acc.add(force);
  };

  this.show = function () {
    this.red = r;
    this.green = g;
    this.blue = b;
    this.sw = stw;
    noFill();
    stroke(this.red, this.green, this.blue);
    strokeWeight(this.sw);
    //ellipse(this.pos.x, this.pos.y, this.prevPos.x / 3, this.prevPos.y / 13);
    this.ww = windowWidth;
    this.wh = windowHeight;
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    line(
      this.ww - this.pos.x,
      this.pos.y,
      this.ww - this.prevPos.x,
      this.prevPos.y
    );
    line(
      this.pos.x,
      this.wh - this.pos.y,
      this.prevPos.x,
      this.wh - this.prevPos.y
    );
    line(
      this.ww - this.pos.x,
      this.wh - this.pos.y,
      this.ww - this.prevPos.x,
      this.wh - this.prevPos.y
    );
    this.updatePrev();
  };
  this.updatePrev = function () {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  };
  this.edges = function () {
    if (this.pos.x > windowWidth - 30) {
      this.pos.x = 30;
      this.updatePrev();
    }
    if (this.pos.x < 30) {
      this.pos.x = windowWidth - 30;
      this.updatePrev();
    }
    if (this.pos.y > windowHeight - 30) {
      this.pos.y = 30;
      this.updatePrev();
    }
    if (this.pos.y < 30) {
      this.pos.y = windowHeight - 30;
      this.updatePrev();
    }
  };
  this.follow = function (vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  };
}

function Particle2(r, g, b, x, y, stw, spd) {
  this.xpos = x;
  this.ypos = y;
  this.pos = createVector(this.xpos, this.ypos);
  this.vel = createVector(1, 10);
  this.acc = createVector(10, 1);
  this.maxspeed = spd;
  this.prevPos = this.pos.copy();

  this.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0.2);
  };

  this.applyForce = function (force) {
    this.acc.add(force);
  };

  this.show = function () {
    this.red = r;
    this.green = g;
    this.blue = b;
    this.sw = stw;
    noFill();
    stroke(this.red, this.green, this.blue);
    strokeWeight(this.sw);
    //ellipse(this.pos.x, this.pos.y, this.prevPos.x / 3, this.prevPos.y / 13);
    this.ww = windowWidth;
    this.wh = windowHeight;
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    line(
      this.ww - this.pos.x,
      this.pos.y,
      this.ww - this.prevPos.x,
      this.prevPos.y
    );
    line(
      this.pos.x,
      this.wh - this.pos.y,
      this.prevPos.x,
      this.wh - this.prevPos.y
    );
    line(
      this.ww - this.pos.x,
      this.wh - this.pos.y,
      this.ww - this.prevPos.x,
      this.wh - this.prevPos.y
    );
    this.updatePrev();
  };
  this.updatePrev = function () {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  };
  this.edges = function () {
    if (this.pos.x > windowWidth - 30) {
      this.pos.x = 30;
      this.updatePrev();
    }
    if (this.pos.x < 30) {
      this.pos.x = windowWidth - 30;
      this.updatePrev();
    }
    if (this.pos.y > windowHeight - 30) {
      this.pos.y = 30;
      this.updatePrev();
    }
    if (this.pos.y < 30) {
      this.pos.y = windowHeight - 30;
      this.updatePrev();
    }
  };
  this.follow = function (vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  };
}

var inc = fxrandRange(20, 30, 0.1);
var scl = fxrandRange(25, 60, 1);
var magv = fxrandRange(2, 3, 0.1);
var cols, rows;
var fr;
var zoff = 10;
var particles = [];
var particles2 = [];
var particles3 = [];
var flowfield;
var magv;
var cr = fxrandRange(15, 170, 1);
var cg = fxrandRange(10, 180, 1);
var cb = fxrandRange(30, 200, 1);
var dr = fxrandRange(24, 250, 1);
var dg = fxrandRange(15, 200, 1);
var db = fxrandRange(12, 180, 1);
var indexk = 0;
var sw1 = fxrandRange(0.1, 0.4, 0.1);
var sw2 = fxrandRange(0.1, 0.2, 0.1);
var mes1a = fxrandRange(0.1, 80, 0.1);
var mes2a = fxrandRange(1, 8, 1);
var mes1b = fxrandRange(2, 40, 0.1);
var mes2b = fxrandRange(1, 1.5, 0.1);

function setup() {
  createCanvas(windowWidth, windowHeight);

  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);
  fr = createP("");
  flowfield = new Array(cols * rows);
  for (i = 0; i < 500; i++) {
    particles[i] = new Particle(
      cr,
      0,
      0,
      (fxrand() * i) / 2 + windowWidth / mes1a,
      fxrand() * i * 2 + windowHeight / mes1b,
      sw1,
      0.5,
      6
    );
  }
  for (i = 0; i < 500; i++) {
    particles3[i] = new Particle(
      80,
      70,
      0,
      (fxrand() * i) / 2 + windowWidth / 4,
      fxrand() * i * 2 + windowHeight / 2,
      0.3,
      3
    );
  }

  for (i = 0; i < 300; i++) {
    particles2[i] = new Particle2(
      0,
      100,
      20,
      fxrand() * i + windowWidth / mes2a,
      fxrand() * i + windowHeight / mes2b,
      sw2,
      5
    );
  }
  // background(235, 215, 141);
  background(0);
}

function draw() {
  if (indexk > 100) {
    noLoop();
  }
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      flowfield[index] = v;
      var angle = zoff * xoff * yoff * 100;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(magv);
      xoff += inc;

      //rect(scl * x, scl * y, scl, scl);
    }
    yoff += inc;
    zoff += 0.003;
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  for (var i = 0; i < particles2.length; i++) {
    particles2[i].follow(flowfield);
    particles2[i].update();
    particles2[i].edges();
    particles2[i].show();
  }
  for (var i = 0; i < particles3.length; i++) {
    particles3[i].follow(flowfield);
    particles3[i].update();
    particles3[i].edges();
    particles3[i].show();
  }
  push();
  rectMode(RADIUS);
  fill(0, 1 * sin(millis() * 1));
  noStroke();
  rect(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth / 2 - 30,
    windowHeight / 2 - 30
  );
  pop();
  // stroke(0, 130);
  // push();
  // translate(x * scl, y * scl);
  // rotate(v.heading());
  // strokeWeight(0.1);
  // line(0, 0, scl, 0);
  // pop(); //fill(r);
  indexk = indexk + 1;
  //console.log(indexk);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  indexk = 0;
  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);
  //fr = createP("");
  flowfield = new Array(cols * rows);

  for (i = 0; i < 500; i++) {
    particles[i] = new Particle(
      cr,
      0,
      0,
      (fxrand() * i) / 2 + windowWidth / mes1a,
      fxrand() * i * 2 + windowHeight / mes1b,
      sw1,
      0.5,
      6
    );
  }
  for (i = 0; i < 500; i++) {
    particles3[i] = new Particle(
      80,
      70,
      0,
      (fxrand() * i) / 2 + windowWidth / 4,
      fxrand() * i * 2 + windowHeight / 2,
      0.3,
      3
    );
  }

  for (i = 0; i < 500; i++) {
    particles2[i] = new Particle2(
      0,
      100,
      20,
      fxrand() * i + windowWidth / mes2a,
      fxrand() * i + windowHeight / mes2b,
      sw2,
      6
    );
  }
  // background(235, 215, 141);

  push();
  noStroke();
  background(0);
  rectMode(RADIUS);
  fill(0);
  //fill(alpha(50));
  rect(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth / 2 - 30,
    windowHeight / 2 - 30
  );

  rectMode(RADIUS);
  fill(0, 1 * sin(millis() * 1));
  noStroke();
  rect(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth / 2 - 30,
    windowHeight / 2 - 30
  );
  pop();
}

function fxrandRange(min, max, step) {
  value = Math.round((fxrand() * (max - min)) / step);
  return value * step + min;
}

window.$fxhashFeatures = {
  Woods: cr,
  Dark: db,
  Light: magv,
  Guardian: inc,
  Feral: scl,
};

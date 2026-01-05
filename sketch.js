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
var cr = fxrandRange(60, 200, 1);
var cg = fxrandRange(10, 180, 1);
var cb = fxrandRange(30, 200, 1);
var dr = fxrandRange(24, 220, 1);
var dg = fxrandRange(15, 200, 1);
var db = fxrandRange(12, 180, 1);
var indexk = 0;
var sw1 = fxrandRange(0.5, 1.5, 0.1);
var sw2 = fxrandRange(0.1, 0.2, 0.1);
var sclBase = scl;
var sw1Base = sw1;
var sw2Base = sw2;
var mes1a = fxrandRange(0.1, 80, 0.1);
var mes2a = fxrandRange(1, 8, 1);
var mes1b = fxrandRange(2, 40, 0.1);
var mes2b = fxrandRange(1, 1.5, 0.1);

function setup() {
  createCanvas(windowWidth, windowHeight);
  fr = createP("");
  initParticles();
}

function computeScale() {
  var w = windowWidth;
  if (w <= 400) return 1.25;
  if (w <= 768) return 1.15;
  return 1.0;
}

function initParticles() {
  var scale = computeScale();
  scl = sclBase * scale;
  sw1 = sw1Base * scale;
  sw2 = sw2Base * scale;
  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);
  flowfield = new Array(cols * rows);

  particles = [];
  particles2 = [];
  particles3 = [];

  for (var i = 0; i < 500; i++) {
    var r_var = cr + fxrandRange(-15, 15, 1);
    particles[i] = new Particle(
      r_var,
      0,
      0,
      (fxrand() * i) / 2 + windowWidth / mes1a,
      fxrand() * i * 2 + windowHeight / mes1b,
      sw1,
      0.5,
      6
    );
  }
  for (var i = 0; i < 500; i++) {
    var r_var = 80 + fxrandRange(-15, 15, 1);
    var g_var = 70 + fxrandRange(-15, 15, 1);
    particles3[i] = new Particle(
      r_var,
      g_var,
      0,
      (fxrand() * i) / 2 + windowWidth / 4,
      fxrand() * i * 2 + windowHeight / 2,
      0.3,
      3
    );
  }

  for (var i = 0; i < 300; i++) {
    var g_var = 100 + fxrandRange(-15, 15, 1);
    var b_var = 20 + fxrandRange(-15, 15, 1);
    particles2[i] = new Particle2(
      0,
      g_var,
      b_var,
      fxrand() * i + windowWidth / mes2a,
      fxrand() * i + windowHeight / mes2b,
      sw2,
      5
    );
  }
  background(0);
  indexk = 0;
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
      var angle = zoff * xoff * yoff * 100;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(magv);
      flowfield[index] = v;
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
  initParticles();
  loop();
}

function mousePressed() {
  initParticles();
  loop();
}

function fxrandRange(min, max, step) {
  var value = Math.round((fxrand() * (max - min)) / step);
  return value * step + min;
}

window.$fxhashFeatures = {
  Woods: cr,
  Dark: db,
  Light: magv,
  Guardian: inc,
  Feral: scl,
};

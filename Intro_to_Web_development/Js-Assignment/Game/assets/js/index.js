// get a refrence to the canvas and its context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const backgroundMusic = new Audio("assets/media/pirates-5533.mp3");
backgroundMusic.type = 'audio/mp3';

const deathMusic = new Audio("assets/media/ship-crash.mp3");
deathMusic.type = 'audio/mp3';

// const power = new Audio("assest/audio/power.wav");
// power.type = 'audio/wav';

//modal
const modal = document.getElementById("modal");
const modalTwo = document.getElementById("modal-2");
const startGame = document.getElementById("start-game");
const playAgain = document.getElementById("play-again");
var canplay = false;

startGame.addEventListener("click", () => {
  canplay = true;
  modal.style.display = "none";
  startTimer();
  canvas.style.display = "block";
});

playAgain.addEventListener("click", () => {
  modalTwo.style.display = "none";
  startTimer();
  canplay = true;
});

// Scaling Factors
let horizontalScale = window.innerWidth / canvas.width;
let verticalScale = window.innerHeight / canvas.height;

//score

const surviveTime = document.getElementById("survive-time");

const scoreText = document.getElementById("score-text");
var minute = 0;
var second = 0;
var stopTime = true;

function startTimer() {
  if (stopTime == true) {
    stopTime = false;
    timerCycle();
    backgroundMusic.play();
  }
}

function stopTimer() {
  if (stopTime == false) {
    stopTime = true;
    let time = `${minute}:${second}`;
    surviveTime.innerText = time;
    backgroundMusic.pause();
    deathMusic.play()
  }
}

function timerCycle() {
  if (stopTime == false) {
    second = parseInt(second);
    minute = parseInt(minute);

    second = second + 1;

    if (second == 60) {
      minute = minute + 1;
      second = 0;
    }

    if (second < 10 || second == 0) {
      second = "0" + second;
    }
    if (minute < 10 || minute == 0) {
      minute = "0" + minute;
    }

    scoreText.innerText = `${minute}:${second}`;

    setTimeout("timerCycle()", 1000);
  }
}

//yuval code area

//yuval code area


let circle = document.getElementById("userShip");

const onMouseMove = (e) => {
  if (canplay) {
    circle.style.left = e.pageX + "px";
  }
};

document.addEventListener("mousemove", onMouseMove);

image = new Image();
image.src = "assets/media/Animated-Bomb-PNG.png";

// newly spawned objects start at Y=25
var spawnLineY = 0;

// spawn a new object every 1500ms
var spawnRate = 1500;

// set how fast the objects will fall
var spawnRateOfDescent = 0.5;

// when was the last object spawned
var lastSpawn = Date.now() + 500;

// this array holds all spawned object
var objects = [];



// save the starting time (used to calc elapsed time)
var startTime = Date.now();

var xSpawnArray = [];
setInterval(function () {
  var xSpawn = Math.random() * (canvas.width - 30) + 15;
  xSpawnArray.push(xSpawn);
  // detectCollisions();

  objects[0] = circle.getBoundingClientRect();

  //console.log(objects);
}, 1000);
// start animating
animate();

function spawnRandomObject() {
  // create the new object
  var object = {
    // set x randomly but at least 15px off the canvas edges
    x: Math.random() * (canvas.width - 30) + 15,
    // set y to start on the line where objects are spawned
    y: spawnLineY,
  };

  // add the new object to the objects[] array
  objects.push(object);
}
//console.log(objects);

function animate() {

  if (!stopTime) {

    // get the elapsed time
    var time = Date.now();

    // see if its time to spawn a new object
    if (time > lastSpawn + spawnRate && !stopTime) {
      lastSpawn = time;
      spawnRandomObject();
    }

    // clear the canvas so all objects can be
    // redrawn in new positions

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // move each object down the canvas
    for (var i = 0; i < objects.length; i++) {
      var object = objects[i];
      // object = document.createElement('div');
      object.y += spawnRateOfDescent;
      ctx.beginPath();
      ctx.drawImage(image, object.x, object.y, 15, 15);
      ctx.imageSmoothingEnabled = false;
      ctx.closePath();
    }

    detectCollisions();
  }

  // request another animation frame
  requestAnimationFrame(animate);
}

function intersectRect(r1, r2) {
  return (r2.left < (r1.x + 15) * horizontalScale &&
    r2.right > (r1.x) * horizontalScale &&
    r2.top < (r1.y + 15) * verticalScale &&
    r2.bottom > (r1.y) * verticalScale);

}

function detectCollisions() {

  //for (let i = 0; i < objects.length; i++) {

  //}

  let obj1;
  let obj2;

  // Reset collision state of all objects
  for (let i = 0; i < objects.length; i++) {
    objects[i].isColliding = false;
  }

  // Define user object
  obj2 = objects[0];

  // Start checking for collisions
  for (let i = 1; i < objects.length; i++) {
    obj1 = objects[i];
    // Compare object1 with object2
    if (
      intersectRect(
        obj1,
        obj2
      )
    ) {
      obj1.isColliding = true;
      obj2.isColliding = true;
      stopTimer();
      modalTwo.style.display = "flex";
      canplay = false;
      for (i = 1; i < objects.length; i++) {
        objects[i] = 0;
      }
      minute = 0;
      second = 0;

    }
  }

}

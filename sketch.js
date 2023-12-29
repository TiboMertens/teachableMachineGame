let player;
let cars = [];
let bg;

let imageModelURL = "https://teachablemachine.withgoogle.com/models/lUQbu95fv/";

let video;
let flipVideo;
let label = "waiting...";

let classifier;

function preload() {
  bg = loadImage("images/background.jpg");
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  let canvas = createCanvas(screen.width, screen.height);
  canvas.position(windowWidth - width, 0); // Align to the right, 0 from the top

  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video);

  // Start classifying
  classifyVideo();

  // Initialize the game
  player = new Player(1400, 700 / 2);
  cars = [];
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  label = results[0].label;

  if (label === "Links") {
    player.moveLeft();
  } else if (label === "Rechts") {
    player.moveRight();
  }
  console.log(label);
  // Classifiy again!
  classifyVideo();
}

function draw() {
  // Draw background
  background(0);
  imageMode(CENTER);
  image(bg, width / 2, height / 2, width, height);

  //draw a rect underneath the video
  fill(255);
  noStroke();
  rectMode(CORNER);
  rect(0, 0, 350, screen.height);

  imageMode(CORNER);
  image(flippedVideo, 10, 10);

  //write the instructions
  fill(0);
  textSize(16);
  textAlign(CORNER, CORNER);
  text("Hand open voor Links", 90, 300);
  text("Vuist voor Rechts", 75, 350);

  //write the label in the middle of the rectangle
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, 170, 430);

  // Spawn a new car every couple of seconds
  if (frameCount % 60 === 0) {
    let randomX = random(500, screen.width);
    let randomColor = color(random(255), random(255), random(255));
    let newCar = new Car(randomX, 0, randomColor);
    cars.push(newCar);
  }

  // Display and move each car
  for (let i = cars.length - 1; i >= 0; i--) {
    let currentCar = cars[i];
    currentCar.display();
    currentCar.move();

    // Check for collision with player
    if (
      collideRectCircle(
        currentCar.x,
        currentCar.y,
        50,
        50,
        player.x,
        player.y,
        50,
        50
      )
    ) {
      gameOver();
    }

    // Remove cars that are off the screen
    if (currentCar.y > height) {
      cars.splice(i, 1);
    }
  }

  // Display and move the player
  player.display();
}

function gameOver() {
  // stop the game loop
  noLoop();
}

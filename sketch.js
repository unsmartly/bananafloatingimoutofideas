//var appleScore = 0;
var score = 0;

var gameState = 1

function preload() {
  bgImg = loadImage("assets/raining_background.png");

  bananaImg = loadImage("assets/banana_sprite.png");
  bulletImg = loadImage("assets/bullet-banana-removebg-preview.png");
  arrowImg = loadImage("assets/arrow_banana-removebg-preview.png");
  banana2Img = loadAnimation("assets/banana_DEATH-removebg-preview (1).png");

  // bgImg1 = loadImage("assets/intro-2.png");

  // boomImg = loadImage("assets/boom-removebg-preview.png");

}

function setup() {
  createCanvas(1200, 440);

  bg = createSprite(width / 2, height / 2, width, height);
  bg.addImage(bgImg);
  bg.scale = 0.5


  banana = createSprite(200, height / 2 + 60);
  banana.addAnimation("standing", bananaImg);
  banana.addAnimation("dead", banana2Img)
  banana.scale = 0.3

  leftMargin = createSprite(0, height / 2, 10, height)
  leftMargin.visible = false

  // orange = createSprite(width - 100, height / 2 + 60);
  // orange.addImage(orangeImg);
  // orange.scale = 0.6

  // sun = createSprite(400, 100);
  // sun.addImage(sunImg);

  // bow = createSprite(1030, 270);
  // bow.addImage(bowImg);
  // bow.scale = 0.7;

  // gun = createSprite(250, 250);
  // gun.addImage(gunImg);
  // gun.scale = 0.7;

  // bulletGroup = new Group()
  // arrowGroup = new Group()
  obstacles = new Group();
  // appleSheildGroup = new Group()
  // orangeSheildGroup = new Group()

  // bg1 = createSprite(width / 2 + 100 , height / 2 +100 , width, height);
  // bg1.addImage(bgImg1);
  // bg1.scale = 0.7


  //appleScore=0;
  //orangeScore=0;
}

function draw() {
  background(0);
  text("Score: " + score, 200, 100);


  drawSprites()

  if (gameState == 1) {
    spawnObstacles()

    if (obstacles.isTouching(banana)) {
      gameState = 2

    }

    if (keyIsDown(UP_ARROW) && banana.y > 100) {
      banana.y -= 10
    }

    if (keyIsDown(DOWN_ARROW) && banana.y < 380) {
      banana.y += 10
    }

    if (obstacles.isTouching(leftMargin)) {
      obstacles.destroyEach()
      score += 1
    }

  }


  if (gameState == 2) {
    obstacles.destroyEach()
    banana.changeAnimation("dead")
    obstacles.setVelocityXEach(0)
    swal(
      {
        title: `Game Over!!!`,
        imageUrl: "https://raw.githubusercontent.com/unsmartly/playagain/main/play_again_notification.png",
        imageSize: "150x150",
        confirmButtonText: "Play Again"
      },
      function (isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }

  textSize(30)
  fill("red")
  text("Score : " + score, 130, 30)

}


function spawnObstacles() {
  if (frameCount % 80 == 0) {

    obstacle = createSprite(900, Math.round(random(100, 400)));
    obstacle.scale = 0.5
    obstacle.velocityX = -10

    n = Math.round(random(1, 2))

    if (n == 1) {
      obstacle.addImage(arrowImg);
    }
    else {
      obstacle.addImage(bulletImg);
    }

    obstacles.add(obstacle)
  }
}

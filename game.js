const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GRAVITY = 0.6;
const WORLD = {
  width: canvas.width,
  height: canvas.height
};

const keys = Object.create(null);

const player = {
  x: 50,
  y: 300,
  width: 30,
  height: 30,
  velocityX: 0,
  velocityY: 0,
  moveSpeed: 4,
  jumpForce: 12,
  onGround: false
};

let platforms = [];
let door = null;

function createLevel() {
  return {
    platforms: [
      { x: 0, y: 360, width: 800, height: 40, isFake: false },
      { x: 200, y: 300, width: 100, height: 20, isFake: true },
      { x: 400, y: 250, width: 100, height: 20, isFake: false }
    ],
    door: {
      x: 700,
      y: 310,
      width: 30,
      height: 50,
      killsPlayerOnce: true
    }
  };
}

function resetPlayer() {
  player.x = 50;
  player.y = 300;
  player.velocityX = 0;
  player.velocityY = 0;
  player.onGround = false;
}

function initLevel() {
  const level = createLevel();
  platforms = level.platforms;
  door = level.door;
  resetPlayer();
}

window.addEventListener("keydown", event => {
  keys[event.key] = true;
});

window.addEventListener("keyup", event => {
  keys[event.key] = false;
});

function updateHorizontalMovement() {
  if (keys.ArrowLeft) {
    player.velocityX = -player.moveSpeed;
    return;
  }

  if (keys.ArrowRight) {
    player.velocityX = player.moveSpeed;
    return;
  }

  player.velocityX = 0;
}

function tryJump() {
  if (keys.ArrowUp && player.onGround) {
    player.velocityY = -player.jumpForce;
    player.onGround = false;
  }
}

function applyPhysics() {
  player.velocityY += GRAVITY;
  player.x += player.velocityX;
  player.y += player.velocityY;
}

function handlePlatformCollisions() {
  player.onGround = false;

  platforms = platforms.filter(platform => {
    const collidedWhileFalling =
      isColliding(player, platform) && player.velocityY >= 0;

    if (!collidedWhileFalling) {
      return true;
    }

    if (platform.isFake) {
      return false;
    }

    player.y = platform.y - player.height;
    player.velocityY = 0;
    player.onGround = true;
    return true;
  });
}

function handleDoorCollision() {
  if (!isColliding(player, door)) {
    return;
  }

  if (door.killsPlayerOnce) {
    door.killsPlayerOnce = false;
    initLevel();
    return;
  }

  alert("You win. Took long enough.");
  initLevel();
}

function handleOutOfBounds() {
  if (player.y > WORLD.height) {
    initLevel();
  }
}

function update() {
  updateHorizontalMovement();
  tryJump();
  applyPhysics();
  handlePlatformCollisions();
  handleDoorCollision();
  handleOutOfBounds();
}

function drawPlayer() {
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
  platforms.forEach(platform => {
    ctx.fillStyle = platform.isFake ? "#666" : "#fff";
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
}

function drawDoor() {
  ctx.fillStyle = "red";
  ctx.fillRect(door.x, door.y, door.width, door.height);
}

function draw() {
  ctx.clearRect(0, 0, WORLD.width, WORLD.height);
  drawPlayer();
  drawPlatforms();
  drawDoor();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

initLevel();
gameLoop();

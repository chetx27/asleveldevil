const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const gravity = 0.6;
const keys = {};

const player = {
  x: 50,
  y: 300,
  w: 30,
  h: 30,
  vx: 0,
  vy: 0,
  speed: 4,
  jump: 12,
  onGround: false
};

let platforms;
let door;

function initLevel() {
  platforms = [
    { x: 0, y: 360, w: 800, h: 40, fake: false },
    { x: 200, y: 300, w: 100, h: 20, fake: true },
    { x: 400, y: 250, w: 100, h: 20, fake: false }
  ];

  door = {
    x: 700,
    y: 310,
    w: 30,
    h: 50,
    killsOnce: true
  };

  player.x = 50;
  player.y = 300;
  player.vx = 0;
  player.vy = 0;
}

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

function update() {
  if (keys["ArrowLeft"]) player.vx = -player.speed;
  else if (keys["ArrowRight"]) player.vx = player.speed;
  else player.vx = 0;

  if (keys["ArrowUp"] && player.onGround) {
    player.vy = -player.jump;
    player.onGround = false;
  }

  player.vy += gravity;
  player.x += player.vx;
  player.y += player.vy;

  player.onGround = false;

  platforms.forEach((p, i) => {
    if (collide(player, p) && player.vy >= 0) {
      if (p.fake) {
        platforms.splice(i, 1);
      } else {
        player.y = p.y - player.h;
        player.vy = 0;
        player.onGround = true;
      }
    }
  });

  if (collide(player, door)) {
    if (door.killsOnce) {
      door.killsOnce = false;
      initLevel();
    } else {
      alert("You win. Took long enough.");
      initLevel();
    }
  }

  if (player.y > canvas.height) {
    initLevel();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  platforms.forEach(p => {
    ctx.fillStyle = p.fake ? "#666" : "#fff";
    ctx.fillRect(p.x, p.y, p.w, p.h);
  });

  ctx.fillStyle = "red";
  ctx.fillRect(door.x, door.y, door.w, door.h);
}

function collide(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

initLevel();
loop();

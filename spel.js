let canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.draw();
    this.x += this.velocity.x * 3; // lägg till sen, gå upp i level, hastigheten ökar.
    this.y += this.velocity.y * 3;
  }
}

// function randomColor() {
//   const r = Math.floor(Math.random() * 256);
//   const b = Math.floor(Math.random() * 256);
//   const g = Math.floor(Math.random() * 256);
//   return `rgb(${r}, ${g}, ${b})`;
// }

class Enemy {
  constructor(x, y, radius, color, movement) {
    this.radius = Math.random() * 40 + 30;
    this.color = color;
    this.movement = movement;
    this.x = Math.random() * (canvas.width - this.radius * 2 + this.radius);
    this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.draw();
    this.x += this.movement.x * 5;
    this.y += this.movement.y * 5;

    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
      this.movement.x = -this.movement.x; //Reverse movement i x led
    }
    if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
      this.movement.y = -this.movement.y;
    }
  }
}

let x = canvas.width / 2;
let y = canvas.height / 2;

const projectiles = [];
const enemies = [];

const player = new Player(x, y, 30, "green");
player.draw();

const projectile = new Projectile(x, y, 5, "red", { x: 1, y: 1 });

function spawnEnemies() {
  for (let i = 0; i < 5; i++) {
    let enemy = new Enemy(x, y, 30, "blue", { x: 1, y: 1 });
    enemies.push(enemy);
  }
}

spawnEnemies();

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();

  enemies.forEach((enemy) => {
    enemy.update();
  });
  projectiles.forEach((projectile) => {
    projectile.update();
  });
}

window.addEventListener("click", (event) => {
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  console.log(angle);
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "red", velocity)
  );
});

animate();

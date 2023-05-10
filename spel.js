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

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = radius;
    this.color = Math.floor(Math.random() *16777215 ).toString(16);
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

let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = 2;
const projectiles = [];
const enemies = [];

const player = new Player(x, y, 30, "green");
player.draw();


const projectile = new Projectile(x, y, 5, "red", { x: 1, y: 1 });

function spawnEnemies() {
  for (let i = 0; i < 5; i++) {
    let enemy = new Enemy(x, y, 30, "green", {x:0, y:0} )
    enemies.push(enemy)
    
  }
}

spawnEnemies();


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();

  enemies.forEach((enemy) => {
    enemy.update()
  })
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

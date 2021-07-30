import { resolveCollision } from './collisions.js'; 

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const colors = [];

//Helper Functions
function distance(x1, y1, x2, y2) {
    const distX = x2 - x1;
    const distY = y2 - y1;
    return Math.hypot(distX, distY);
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Event Listeners
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
})

// Objects
class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.mass = 0.1;
        this.velocities = [-1, 1];
        this.velocity = {
            x: this.velocities[Math.round(Math.random())],
            y: this.velocities[Math.round(Math.random())],
        }
        this.color = color;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
    }

    update(circles) {
        this.draw();

        //Collision check
        for (let i = 0; i < circles.length; i++) {
            if (this === circles[i]) continue;
            if (distance(this.x, this.y, circles[i].x, circles[i].y)  < this.radius * 2) {
                resolveCollision(this, circles[i]);
            }
        }
        //Prevent circles from leaving canvas
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.velocity.x = this.velocity.x * -1;
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.velocity.y = this.velocity.y * -1;
        }
        //Update position of circle based on velocity
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

// Implementation
let circles;
function init() {
    circles = [];
    const numCircles = 100;

    for (let i = 0; i < numCircles; i++) {
        const color = 'blue';
        const radius = 20;
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);

        if (i !== 0) {
            for (let j = 0; j < circles.length; j++) {
                if (distance(x, y, circles[j].x, circles[j].y)  < radius * 2) {
                    x = randomIntFromRange(radius, canvas.width - radius);
                    y = randomIntFromRange(radius, canvas.height - radius);
                    j = -1;
                }
            }
        }
        circles.push(new Circle(x, y, radius, color));
    }
}

// Animation
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach((circle) => {
        clearInterval();
        circle.update(circles);
    })
}

init();
animate();
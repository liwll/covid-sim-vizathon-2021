import { resolveCollision } from './collisions.js'; 
import { distance } from './utility.js'

const INIT_INFECTION_CHANCE = 0.05;
const INFECTION_DISTANCE = 50;
const STATUSES = {
    HEALTHY: "HEALTHY",
    INFECTED: "INFECTED",
    RECOVERED: "RECOVERED",
  };
const RECOVERY_TIME = 14000;

class Circle {
    constructor(x, y, radius, ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.mass = 100;
        this.velocity = {
            x: Math.random() - 0.5,
            y: Math.random() - 0.5
        }
        this.status = STATUSES.HEALTHY;
        this.color = 'white';
        this.ctx = ctx;

        if (Math.random() < INIT_INFECTION_CHANCE) {
            this.infect();
        }
    }

    infect() {
        if (this.status === STATUSES.INFECTED || this.status === STATUSES.RECOVERED) {
            return;
        }

        this.status = STATUSES.INFECTED;
        this.color = "red";
        setTimeout(() => {
            this.recover();
        }, RECOVERY_TIME);
    }
    
    recover() {
        this.status = STATUSES.RECOVERED;
        this.color = "#7FFF00";
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawLines(circle, otherCircles) {
        for (const c of otherCircles) {
            const d = distance(circle.x, circle.y, c.x, c.y);
    
            if (d > INFECTION_DISTANCE || 
                c.status === STATUSES.RECOVERED) {
                continue;
            }

            c.infect();

            const opacity = 0.8 - (d / INFECTION_DISTANCE) * 0.8;
            this.ctx.lineWidth = 3;
            this.ctx.strokeStyle = circle.color;
            this.ctx.globalAlpha = opacity;
            this.ctx.beginPath();
            this.ctx.moveTo(circle.x, circle.y);
            this.ctx.lineTo(c.x, c.y);
            this.ctx.closePath();
            this.ctx.stroke();
            this.ctx.globalAlpha = 1;
        }
    }

    update(circles) {
        this.draw(this.ctx);
        if (this.status === STATUSES.INFECTED) {
            this.drawLines(this, circles);
        }

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

export default Circle;
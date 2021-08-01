import { resolveCollision } from './collisions.js'; 
import { distance } from './utility.js';
import { COLORS, INIT_INFECTION_RATE, INIT_VACCINATION_RATE, INIT_DISTANCING_RATE, VACCINE_PROTECTION, INFECTION_DISTANCE, STATUSES, RECOVERY_TIME } from './simController.js';

class Circle {
    constructor(x, y, radius, ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.mass = 100;
        this.distancing = Math.random() < INIT_DISTANCING_RATE ? true : false;
        this.velocity =  this.distancing ? {x: 0, y: 0} :  
        {
            x: (Math.random() - Math.random()) * 4,
            y: (Math.random() - Math.random()) * 4,
        }
        this.status = STATUSES.HEALTHY;
        this.color = COLORS.HEALTHY;
        this.health = 100;
        this.ctx = ctx;

        if (Math.random() < INIT_INFECTION_RATE) {
            this.infect();
        }
        if (Math.random() < INIT_VACCINATION_RATE) {
            this.vaccinate();
        }
    }

    infect() {
        if (this.status === STATUSES.INFECTED || this.status === STATUSES.RECOVERED) {
            return;
        }

        this.health -= this.status === STATUSES.VACCINATED ? (100 * (1 - VACCINE_PROTECTION)) : 100;

        if (this.health <= 0) {
            this.status = STATUSES.INFECTED;
            this.color = COLORS.INFECTED;
            setTimeout(() => {
                this.recover();
            }, ((RECOVERY_TIME + Math.random() * 4000) / 2)
            );
        }
    }
    
    recover() {
        this.status = STATUSES.RECOVERED;
        this.color = COLORS.RECOVERED;
    }

    vaccinate() {
        if (this.status === STATUSES.INFECTED || this.status === STATUSES.RECOVERED) {
            return;
        }

        this.status = STATUSES.VACCINATED;
        this.color = COLORS.VACCINATED;
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
        if (!this.distancing) {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }
    }
}

export default Circle;
import Circle from './Circle.js'
import { distance, randomIntFromRange } from './utility.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const colors = [];

// Event Listeners
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  
  init();
})

// Initialization
let circles;
function init() {
    circles = [];
    const numCircles = 100;

    for (let i = 0; i < numCircles; i++) {
        const color = 'white';
        const radius = 5;
        const drawCtx = ctx;
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
        circles.push(new Circle(x, y, radius, color, drawCtx));
    }
}

// Animation
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach((circle) => {
        clearInterval();
        circle.update(circles);
    });
}

init();
animate();
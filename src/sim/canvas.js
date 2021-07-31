import Circle from './Circle.js'
import { STATUSES, POPULATION } from './simController.js';
import { distance, randomIntFromRange } from './utility.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let chart = {
    canvas: document.getElementById('chart-canvas'),
    dimensions: document.getElementById('chart-dimensions')
};

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

    for (let i = 0; i < POPULATION; i++) {
        const radius = 5;
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
        circles.push(new Circle(x, y, radius, ctx));
    }
    Chart.init(chart, POPULATION);
    Chart.start();
}

// Animation
let simData = {HEALTHY: 0, VACCINATED: 0, INFECTED: 0, RECOVERED: 0};
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach((circle) => {
        clearInterval();
        circle.update(circles);
        simData[circle.status]++;
    });
    Chart.update(simData);
    Chart.draw();
    simData = {HEALTHY: 0, VACCINATED: 0, INFECTED: 0, RECOVERED: 0};
}

export { init, animate };
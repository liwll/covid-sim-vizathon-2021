import Circle from './Circle.js'
import { STATUSES, POPULATION } from './simController.js';
import { distance, randomIntFromRange } from './utility.js';
import updateChartStats from './updateChartStats.js';
import { initChart, startChart, updateChart, drawChart} from './chart.js'

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
    initChart(chart, POPULATION);
    startChart();
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
    updateChart(simData);
    updateChartStats(simData);
    drawChart();
    simData = {HEALTHY: 0, VACCINATED: 0, INFECTED: 0, RECOVERED: 0};
}

export { init, animate };
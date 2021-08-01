import { chartColors, chartSafeLimit, totalFrames } from './simController.js';

'use strict';

let chartCanvas, chartDimensions, ctx, maxValue,
        currentStep, dangerSick, safeSick, healthy, recovered;



function drawLine(height, from, to) {
    ctx.beginPath();
    ctx.moveTo(from, height);
    ctx.lineTo(to, height);
    ctx.closePath();
    ctx.strokeStyle = chartColors.safeLine;
    ctx.stroke();
}

function drawRect(color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawPolygon(data, color, height, stepSize) {
    ctx.beginPath();
    ctx.moveTo(0, height);
    let step = -stepSize;
    for (let i=0; i<data.length; i++) {
        step += stepSize;
        ctx.lineTo(step, data[i] * height);
    }

    ctx.lineTo(step, height);
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();
}

function initChart(chart, value) {
    // init parameters
    chartCanvas =  chart.canvas;
    chartDimensions = chart.dimensions;
    ctx = chartCanvas.getContext('2d');
    maxValue = value;
}

function clearChart(chart) {
    // clear canvas
    chartCanvas =  chart.canvas;
    chartCanvas.width = chartCanvas.height = 0;
}

function startChart() {
    // clean chart states
    dangerSick = [];
    safeSick = [];
    healthy = [];
    recovered = [];
    currentStep = 0;
}

function updateChart(data) {
    // save the values as percentages
    let infectedValue = maxValue - data.INFECTED;
    let healthyValue = infectedValue - data.HEALTHY;
    let recoveredValue = healthyValue - data.RECOVERED;
    infectedValue /= maxValue;
    healthyValue /= maxValue;
    recoveredValue /= maxValue;

    dangerSick.push(infectedValue);
    safeSick.push(Math.max(infectedValue, chartSafeLimit));
    healthy.push(healthyValue);
    recovered.push(recoveredValue);
}

function drawChart() {
    // The chart canvas width and height can be found using offsetWidth and offsetHeight
    let width = chartDimensions.offsetWidth;
    let height = chartDimensions.offsetHeight;
    let stepSize = width / (totalFrames - 1); // minus the first frame/result, because that's the start of the chart
    let currentStepSize = currentStep * stepSize;

    // update dimensions and clear canvas
    // the canvas is cleared when a new value is attached to dimensions (no matter if a same value)
    chartCanvas.width = width;
    chartCanvas.height = height;

    // draw empty rect (the upcoming time)
    drawRect(chartColors.empty, currentStepSize, 0, width - currentStepSize, height);
    // draw vaccinated part (a whole rectangle, the elapsed time)
    drawRect(chartColors.vaccinated, 0, 0, currentStepSize, height);
    // draw recovered part
    drawPolygon(recovered, chartColors.recovered, height, stepSize);
    // draw healthy part
    drawPolygon(healthy, chartColors.healthy, height, stepSize);
    // draw danger sick part
    drawPolygon(dangerSick, chartColors.dangerSick, height, stepSize);
    // draw "safe" sick part
    drawPolygon(safeSick, chartColors.safeSick, height, stepSize);
    // draw "safe" line
    drawLine(height * chartSafeLimit, 0, currentStepSize);

    currentStep++;
}

export { initChart, startChart, updateChart, drawChart}
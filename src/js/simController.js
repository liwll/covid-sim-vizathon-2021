import { init, animate } from './canvas.js';

//Event Listeners
let isAnimating = false;
const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', () => {
    init();
    if (!isAnimating) {
        animate();
        isAnimating = true;
    }
    startButton.textContent = "Restart";  
});

let population = 100;
const popSlider = document.getElementById('pop-slider');
popSlider.addEventListener('change', () => {
    population = popSlider.value;
});

let initInfectionRate = 0.05;
const infectionSlider = document.getElementById('infection-slider');
infectionSlider.addEventListener('change', () => {
    initInfectionRate = infectionSlider.value / 100;
});

let initVaccinationRate = 0.5;
const vaccinationSlider = document.getElementById('vaccination-slider');
vaccinationSlider.addEventListener('change', () => {
    initVaccinationRate = vaccinationSlider.value / 100;
});

//Export Settings
export const STATUSES = {
    HEALTHY: "HEALTHY",
    VACCINATED: "VACCINATED",
    INFECTED: "INFECTED",
    RECOVERED: "RECOVERED",
};
export { population as POPULATION};
export { initInfectionRate as INIT_INFECTION_RATE };
export { initVaccinationRate as INIT_VACCINATION_RATE };
export const VACCINE_PROTECTION = 0.997;
export const INFECTION_DISTANCE = 50;
export const RECOVERY_TIME = 10000;

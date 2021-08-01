import { init, animate } from './canvas.js';

let isAnimating = false;
let population = 200;
let initInfectionRate = 0.05;
let initVaccinationRate = 0;
let initDistancingRate = 0;
const simController = () => {
    const startButton = document.getElementById('start-btn');
    startButton.addEventListener('click', () => {
        init();
        if (!isAnimating) {
            animate();
            isAnimating = true;
        }
        startButton.textContent = "Restart";  
    });

    
    const popVal = document.getElementById('pop-val');
    const popSlider = document.getElementById('pop-slider');
    popSlider.addEventListener('input', () => {
        population = popSlider.value;
        popVal.textContent = popSlider.value;
    });

    
    const infectionVal = document.getElementById('infection-val');
    const infectionSlider = document.getElementById('infection-slider');
    infectionSlider.addEventListener('input', () => {
        initInfectionRate = infectionSlider.value / 100;
        infectionVal.textContent = infectionSlider.value;
    });


    const vaccinationVal = document.getElementById('vaccination-val');
    const vaccinationSlider = document.getElementById('vaccination-slider');
    vaccinationSlider.addEventListener('input', () => {
        initVaccinationRate = vaccinationSlider.value / 100;
        vaccinationVal.textContent = vaccinationSlider.value;
    });

    const socialDistVal = document.getElementById('social-dist-val');
    const socialDistSlider = document.getElementById('social-dist-slider');
    socialDistSlider.addEventListener('input', () => {
        initDistancingRate = socialDistSlider.value / 100;
        socialDistVal.textContent = socialDistSlider.value;
    });
}


//Export Settings
export const COLORS = {
    HEALTHY: "white",
    VACCINATED: "#59bfff",
    INFECTED: "red",
    RECOVERED: "#7FFF00",
}
export const STATUSES = {
    HEALTHY: "HEALTHY",
    VACCINATED: "VACCINATED",
    INFECTED: "INFECTED",
    RECOVERED: "RECOVERED",
};
export { population as POPULATION};
export { initInfectionRate as INIT_INFECTION_RATE };
export { initVaccinationRate as INIT_VACCINATION_RATE };
export { initDistancingRate as INIT_DISTANCING_RATE };
export const VACCINE_PROTECTION = 0.995;
export const INFECTION_DISTANCE = 50;
export const RECOVERY_TIME = 10000;
//Chart Settings
let safeLimitPercentage = 0.5;
export const chartSafeLimit = 1 - safeLimitPercentage;
export const chartColors = {
    healthy: "white",
    vaccinated: "#59bfff",
    safeSick: "orange",
    dangerSick: "red",
    recovered: "#7FFF00",
    empty: "#DC3131",
    safeLine: "gray"
};
export const fps = 60;
export const simSeconds = 15;
export const totalFrames = fps * simSeconds;

export default simController;

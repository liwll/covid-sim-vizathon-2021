const updateChartStats = (data) => {
    let numHealthy = data.HEALTHY + data.VACCINATED;
    let numInfected = data.INFECTED;
    let numRecovered = data.RECOVERED;
    
    const statHealthy = document.getElementById('stat-healthy');
    const statInfected = document.getElementById('stat-infected');
    const statRecovered = document.getElementById('stat-recovered');

    statHealthy.textContent = numHealthy;
    statInfected.textContent = numInfected;
    statRecovered.textContent = numRecovered;
}

export default updateChartStats;
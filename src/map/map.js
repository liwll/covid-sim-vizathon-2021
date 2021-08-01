import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { ScatterplotLayer } from '@deck.gl/layers';

const map = () => {
    const sourceData = '/src/data/covid.json';

    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      };
    const showStats = ({ object, x, y }) => {
        const el = document.getElementById('tooltip');
        if (object) {
            const {
                Confirmed,
                Deaths,
                Recovered,
                Combined_Key,
            } = object;
        
            const caseNum = `Total Cases: ${formatNumber(Confirmed)}`
            const deathNum = `Deaths: ${formatNumber(Deaths)}`

            el.innerHTML = `
                <div style="width: 100%;"><h3>${Combined_Key.toUpperCase()}<h3></div>
                <div > ${caseNum} </div>
                <div > ${deathNum} </div>
                `;
            el.style.display = 'flex';
            el.style.alignItems = 'center';
            el.style.justifyContent = 'space-between'
            el.style.opacity = 0.7;
        } else {
            el.style.opacity = 0.0;
        }
    };

    const scatterplot = () => new ScatterplotLayer({
        id: 'scatter',
        data: sourceData,
        opacity: 1.0,
        filled: true,
        radiusScale: 8,
        radiusMinPixels: 3,
        radiusMaxPixels: 100,
        getPosition: d => [d.Long_, d.Lat],
        getRadius: d => d.Confirmed < 100 ? 2 : 
            d.Confirmed < 1000 ? 5 : d.Confirmed / 200,
        getFillColor: d => d.Confirmed > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100],

        pickable: true,
        onClick: showStats,
    });

    window.initMap = () => {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 40.0, lng: -100.0},
            zoom: 5,
            mapId: 'fefe109a5b043585',
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        });

        const overlay = new GoogleMapsOverlay({
            layers: [
                scatterplot(),
            ],
        });

        overlay.setMap(map);
    }
}
export default map;
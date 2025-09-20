document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([54.5260, 15.2551], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    fetch('cities.json')
        .then(response => response.json())
        .then(cities => {
            cities.forEach(city => {
                const icon = new L.Icon({
                    iconUrl: `https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers/img/marker-icon-2x-${city.color}.png`,
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                });

                L.marker([city.lat, city.lng], { icon: icon })
                    .addTo(map)
                    .bindPopup(city.city);
            });
        })
        .catch(error => console.error('Error loading city data:', error));
});

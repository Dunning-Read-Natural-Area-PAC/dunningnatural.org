var map = L
    .map('map')
    .fitBounds([
        [41.954837, -87.802050],
        [41.953841, -87.804863],
        [41.952831, -87.796351]
    ])

L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
)
    .addTo(map);

window.drnaAudioTour.markers.forEach(item => {
    L.marker(item.latlng)
        .addTo(map)
        .bindPopup(item.popup)
        .on('click', (e) => window.drnaAudioTour.play(item.id))
});

map.on('locationfound', (e) => {
    var radius = e.accuracy;
    var radiusft = Number(radius * 3.28084).toFixed(0);

    var myIcon = L.divIcon({
        className: 'fa fa-solid fa-location-dot fa-2xl',
        iconSize: [20, 20],
    });

    L.marker(e.latlng, { icon: myIcon }).addTo(map).bindPopup("You are within " + radiusft + " ft.");

    L.circle(e.latlng, radius).addTo(map);
});

map.locate({ watch: true });
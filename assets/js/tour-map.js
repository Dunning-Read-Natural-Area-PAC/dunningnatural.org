let markers = {}

async function init() {
    let data = await fetch("data.json");
    data = await data.json()

    data.markers.forEach(item => {
        let marker = L.marker(item.latlng)
            .addTo(map)
            .bindPopup(item.popup)
            .on('click', (e) => window.drnaAudioTour.play(item.id))

        markers[item.id] = marker
    });
}
init()

var map = L
    .map('map')
    .fitBounds([
        [41.954837, -87.802050],
        [41.953841, -87.804863],
        [41.952831, -87.796351]
    ])

map.setMaxBounds([
    [41.960224, -87.792026],
    [41.947457, -87.809193]
]);

L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
)
    .addTo(map);

let currentLocationMarker, currentLocationCircle;
map.on('locationfound', (e) => {
    currentLocationMarker && map.removeLayer(currentLocationMarker)
    currentLocationCircle && map.removeLayer(currentLocationCircle)

    var radius = e.accuracy;
    var radiusft = Number(radius * 3.28084).toFixed(0);

    var myIcon = L.divIcon({
        className: 'fa fa-solid fa-location-dot fa-2xl',
        iconSize: [20, 20],
    });

    currentLocationMarker = L.marker(e.latlng, { icon: myIcon }).addTo(map).bindPopup("You are within " + radiusft + " ft.");
    currentLocationCircle = L.circle(e.latlng, radius).addTo(map);
});

map.locate({ watch: true });

function showSelected(id) {
    id = typeof id == 'number' ? id : parseInt(id.dataset.markerId)
    markers[id].openPopup()
}

window.drnaMap = {
    showSelected,
}
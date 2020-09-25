// Setting the origin of the map

const mymap = L.map('mapid').setView([18.508, 73.793], 13);
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
let array = [];

const tiles = L.tileLayer(tileUrl, { attribution })
tiles.addTo(mymap)

// Adding a marker
L.marker([18.508, 73.793]).addTo(mymap)


////////////////////////////////////////////////////////////
// Adding a Circle
let circle;
let circleCenter;
let lat, lng = null
const addCircle = () => {
    const form = document.getElementById('form')
    const radius = document.getElementById("radiusbox")
    let val;


    mymap.on("contextmenu", function (event) {
        const obj = event.latlng
        lat = obj.lat
        lng = obj.lng

        if (circleCenter) {
            mymap.removeLayer(circleCenter)

        }
        circleCenter = L.circle(event.latlng, { radius: 1 }).addTo(mymap);

        form.addEventListener('submit', (e) => {
            e.preventDefault()

            val = parseInt(radius.value);
            if (lat) {
                drawCircle(val, lat, lng)

            }
        })
    })
    function drawCircle(val, lat, lng) {
        if (circle) {
            mymap.removeLayer(circle)

        }
        circle = L.circle([lat, lng], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: val
        }).addTo(mymap);
    }

}

const removeCircle = () => {
    mymap.removeLayer(circle)
    mymap.removeLayer(circleCenter)

    lat = null
    lng = null

}
///////////////////////////////////////////////////////////////////////////
//Logging the coordinates on click
// function onMapClick(e) {
//     console.log("You clicked the map at " + e.latlng);
// }

// mymap.on('click', onMapClick);

//////////Plotting a set of coordinates along a path/////////////////////////////

var latlngs = [];
let data = [
    {
        lat: 18.508,
        lng: 73.793
    },

    {
        lat: 18.50846234,
        lng: 73.7931268
    },

    {
        lat: 18.50846236,
        lng: 73.79356
    },

    {
        lat: 18.50846237,
        lng: 73.793588
    }
]
for (i = 0; i < data.length; i++) {
    latlngs.push([data[i].lat, data[i].lng]);
}

latlngs.map((each) => {
    (
        L.circle([each[0], each[1]], {
            color: 'blue',
            fillColor: '#f03',
            fillOpacity: 0.2,
            radius: 1
        }).addTo(mymap)
    )
});

// var polyline = L.polyline(latlngs, { color: 'red' }).addTo(mymap);

// mymap.fitBounds(polyline.getBounds());

var antPath = L.polyline.antPath;
var path = antPath(latlngs, {
    "paused": false,
    "reverse": false,
    "delay": 3000,
    "dashArray": [10, 20],
    "weight": 5,
    "opacity": 0.5,
    "color": "#0000FF",
    "pulseColor": "#FFFFFF"
});
path.addTo(mymap);



//////////////////////////POLYGON///////////////////////////////

let polygon;
const addPolygon = () => {

    mymap.on("contextmenu", function (event) {
        console.log("Coordinates: " + event.latlng.toString());
        const obj = event.latlng
        const temparr = [obj.lat, obj.lng]
        array.push(temparr)

        if (polygon) {
            mymap.removeLayer(polygon)
        }
        polygon = L.polygon(array, { color: 'red' }).addTo(mymap);

    });
}

const removePolygon = () => {
    mymap.removeLayer(polygon)
    array.length = 0
}




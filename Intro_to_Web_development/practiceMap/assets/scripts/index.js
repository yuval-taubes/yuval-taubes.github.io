"use strict";

function showLocation(position) {
	console.log(position);

	// const longitude = position.coords.longitude
	// const latitude = position.coords.latitude;

	const { longitude, latitude, accuracy } = position.coords;
	map.flyTo({
		center: [longitude, latitude],
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
	});


        const size = 100;
        const pulsingDot = {
            width: size,
            height: size,
            data: new Uint8Array(size * size * 4),
             
            // When the layer is added to the map,
            // get the rendering context for the map canvas.
            onAdd: function () {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d');
            },
             
            // Call once before every frame where the icon will be used.
            render: function () {
            const duration = 1000;
            const t = (performance.now() % duration) / duration;
             
            const radius = (size / 2) * 0.3;
            const outerRadius = (size / 2) * 0.7 * t + radius;
            const context = this.context;
             
            // Draw the outer circle.
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
            );
            context.fillStyle = `rgba(122, 163, 238, ${1 - t})`;
            context.fill();
             
            // Draw the inner circle.
            context.beginPath();
            context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
            );
            context.fillStyle = 'rgba(40, 111, 242, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();
             
            // Update this image's data with data from the canvas.
            this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
            ).data;
             
            // Continuously repaint the map, resulting
            // in the smooth animation of the dot.
            map.triggerRepaint();
             
            // Return `true` to let the map know that the image was updated.
            return true;
            }
            };
             
            map.on('load', () => {
            map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
             
            map.addSource('dot-point', {
            'type': 'geojson',
            'data': {
            'type': 'FeatureCollection',
            'features': [
            {
            'type': 'Feature',
            'geometry': {
            'type': 'Point',
            'coordinates': [longitude, latitude] // icon position [lng, lat]
            }
            }
            ]
            }
            });
            map.addLayer({
            'id': 'layer-with-pulsing-dot',
            'type': 'symbol',
            'source': 'dot-point',
            'layout': {
            'icon-image': 'pulsing-dot'
            }
            });
            });
}

function errorHandler() {
	console.log("nope");
}

if (navigator.geolocation) {
	navigator.geolocation.watchPosition(showLocation, errorHandler, {
		enableHighAccuracy: true,
	});
} else {
	window.alert("geolocation not enabled");
}

mapboxgl.accessToken =
	"pk.eyJ1IjoieXV2YWwtdGF1YmVzIiwiYSI6ImNsMXdnYXJmMTBkcjIzY210bzd0ZDZkOXUifQ.Jr3k4ppO_A0K_Xqvj9dkzg";
const map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/streets-v11",
    center: [-79.4512, 43.6568],
    interactive: false,
	zoom: 20,
});


//random bullshit go

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

 

// We listen to the resize event
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
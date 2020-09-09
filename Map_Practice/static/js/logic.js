// Set up initial map center and zoom level
var map = L.map('map', {
    center: [41.77, -72.69], // EDIT latitude, longitude to re-center map
    zoom: 8,  // EDIT from 1 to 18 -- decrease to zoom out, increase to zoom in
    // scrollWheelZoom: false
  });

  /* Control panel to display map layers */
  var controlLayers = L.control.layers( null, null, {
   position: "topright",
   collapsed: false
  }).addTo(map);

  // display Carto basemap tiles with light features and labels
  var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
  }).addTo(map); // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default
  controlLayers.addBaseLayer(light, 'Carto Light basemap');

  /* Stamen colored terrain basemap tiles with labels */
  var terrain = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
  }); // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default
  controlLayers.addBaseLayer(terrain, 'Stamen Terrain basemap');

  // see more basemap options at https://leaflet-extras.github.io/leaflet-providers/preview/

  // upload CSV file from local directory and display latitude and longitude coordinates as default blue markers on map
  var customLayer = L.geoJson(null, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.Title);
      }
  });

  var runLayer = omnivore.csv('us_county.csv', null, customLayer)
      .on('ready', function() {
          // http://leafletjs.com/reference.html#map-fitbounds
          map.fitBounds(runLayer.getBounds());
      })
      .addTo(map);
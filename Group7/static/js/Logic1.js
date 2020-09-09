// Creating map object
const myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11
  });
  

  // omnivore.csv('covid_us_country.csv').addTo(map);


  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Store API query variables
  const baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
  const date = "$where=created_date between'2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
  const complaint = "&complaint_type=Rodent";
  const limit = "&$limit=10000";
  
  // Assemble API query URL
  const url = baseURL + date + complaint + limit;
  
  // Grab the data with d3
  d3.json(url).then( function(response) {
  
    // Create a new marker cluster group
    const markers = L.markerClusterGroup();
  
    // Loop through data
    response.forEach(response => {
  
      // Check for location property
      if (response.location) {
  
        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([response.location.coordinates[1], response.location.coordinates[0]])
          .bindPopup(response.descriptor));
      }
  
    });
  
    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
  
  });
  
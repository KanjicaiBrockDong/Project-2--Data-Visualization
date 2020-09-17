
Plotly.d3.json("/dbscrape",
  function (err, rows) {
    function unpack(rows, key) {
      return rows.map(function (row) {
        return row[key];
      })
    };

    var cityCounty = unpack(rows, 'county')
    var cityLat = unpack(rows, 'lat')
    var cityLon = unpack(rows, 'long')
    var cityPop = unpack(rows, 'cases')
    var data1 = [{

      lon: cityLon,
      lat: cityLat,
      radius: 30,
      z: cityPop,
      type: "densitymapbox",
      coloraxis: 'coloraxis',
    }];

    var layout = {
      mapbox: {
        center: { lon: -100, lat: 40 },
        style: "outdoors", zoom: 2
      },
      coloraxis: { colorscale: "Viridis" },
      title: { text: "US COVID CASES MAP" },
      width: 1300, height: 400, margin: { t: 100, b: 0 }
    };

    var config = { mapboxAccessToken: "pk.eyJ1IjoiYnVlemVva29zZSIsImEiOiJja2VhbGQ1cm4wMXBwMnhwbHNsbWwwbDJxIn0.4xB6giE5865tbd5P9wwkrA" };

    Plotly.newPlot('map1', data1, layout, config);
  })

// code for bubble map
Plotly.d3.json("/dbscrape", function (err, rows) {
  function unpack(rows, key) {
    return rows.map(function (row) { return row[key]; });
  }
  var cityName = unpack(rows, 'county'),
    cityLat = unpack(rows, 'lat'),
    cityLon = unpack(rows, 'long'),
    cityDeath = unpack(rows, 'deaths'),
    color = ["rgb(255,65,54)", "rgb(133,20,75)", "rgb(255,133,27)", "lightgrey"],
    citySize = [],
    hoverText = [],
    scale = 150;
  for (var i = 0; i < cityDeath.length; i++) {
    var currentSize = cityDeath[i] / scale;
    var currentText = cityName[i] + " County Death: " + cityDeath[i];
    citySize.push(currentSize);
    hoverText.push(currentText);
  }
  var data2 = [{
    type: 'scattergeo',
    locationmode: 'USA-states',
    lat: cityLat,
    lon: cityLon,
    hoverinfo: 'text',
    text: hoverText,
    marker: {
      size: citySize,
      color: 'red',
      line: {
        color: 'black',
        width: 2
      },
    }
  }];
  var layout = {
    title: 'US COVID DEATHS MAP',
    showlegend: false,
    geo: {
      scope: 'usa',
      showland: true,
      landcolor: 'rgb(217, 217, 217)',
      subunitwidth: 1,
      countrywidth: 1,
      subunitcolor: 'rgb(255,255,255)',
      countrycolor: 'rgb(255,255,255)'
    },
    width: 1300, height: 400
  };
  Plotly.newPlot("map2", data2, layout, { showLink: false });
})
// ################################################################################

var tableData = data

tbody = d3.select('tbody')

function displayData(data) {
  tbody.text('')
  data.forEach(function (tableView) {
    newRow = tbody.append('tr')
    Object.entries(tableView).forEach(function ([key, value]) {
      newTd = newRow.append('td').text(value)
    })
  })
}

displayData(tableData)

var filterButton = d3.select('#filter-btn')

filterButton.on('click', function () {

  tbody.html('')

  var State = d3.select('#select-state').property('value')
  var County = d3.select('#select-county').property('value')

  if (State) { searchResults = tableData.filter(search => search.state === State) }
  else if (County) { searchResults = tableData.filter(search => search.county === County) }

  searchResults.forEach((MSC) => {
    var row = tbody.append('tr')
    Object.entries(MSC).forEach(([key, value]) => {
      var cell = row.append('td')
      cell.text(value)
    })
  })

})



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
    // for (var i = 0; i < cityPop.length; i++) {
    // 	// var currentSize = cityPop[i] / scale;
    // 	// var currentText = cityName[i] + " pop: " + cityPop[i];
    // 	// citySize.push(currentSize);
    // 	// hoverText.push(currentText);
    // }
    var currentText = cityCounty + " pop: " + cityPop;
    var data = [{

      lon: cityLon,
      lat: cityLat,
      radius: 500,
      z: cityPop,
      type: "densitymapbox",
      coloraxis: 'coloraxis',
      // text: currentText
      //   hoverinfo: 'skip'
    }];

    var layout = {
      mapbox: {
        center: { lon: -100, lat: 40 },
        style: "outdoors", zoom: 2
      },
      coloraxis: { colorscale: "Viridis" },
      title: { text: "US COVID CASES HEATMAP" },
      width: 1000, height: 400, margin: { t: 30, b: 0 }
    };

    var config = { mapboxAccessToken: "pk.eyJ1IjoiYnVlemVva29zZSIsImEiOiJja2VhbGQ1cm4wMXBwMnhwbHNsbWwwbDJxIn0.4xB6giE5865tbd5P9wwkrA" };

    Plotly.newPlot('map', data, layout, config);
  })
// ################################################################################

// from data.js 
// var data = d3.json("/static/js/covid_data.js").then(function(test) {
//   console.log(test[0]);
// })
// data = JSON.parse(data)
// var tableData = data

// var url = "/dbscrape"
var tableData = data

// get tbody refernce  
tbody = d3.select('tbody')


// use Object.entries to get the data and loop through then insert to html table

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

//select user input and search button
var stateForm = d3.select('#select-state')
var button = d3.select('filter-btn')


// search data with date inputs
function clickSelect() {
    //don't refresh the page! 
    d3.event.preventDefault()
    //print the value that was input 
    console.log(stateForm.property('value'))
    //create a new table with the filterd data only    
     var newTable = tableData.filter(tableView => tableView.select-state === stateForm.property('value')) 

    displayData(newTable)
}

// event handler
stateForm.on('change', clickSelect) 


// ###########################################################################

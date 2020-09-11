// from data.js 
var url = "http://127.0.0.1:5000/dbscrape";
  d3.json(url).then(function(response) {

    console.log(response);

    var data = response;

// get tbody refernce  
tbody = d3.select('tbody')


// use Object.entries to get the data and loop through then insert to html table

function displayData(data) {
    tbody.text('')
    data.forEach(function (covidTable) {
        newRow = tbody.append('tr')
        Object.entries(covidTable).forEach(function ([key, value]) {
            newTd = newRow.append('td').text(value)
        })
    })
}

displayData(tableData)

//select user input and search button
var State = d3.select('#select-state')
var button = d3.select('filter-btn')


// search data with date inputs
function clickSelect() {
    //don't refresh the page! 
    d3.event.preventDefault()
    //print the value that was input 
    console.log(dateForm.property('value'))
    //create a new table with the filterd data only    
     var newTable = tableData.filter(sighting => sighting.datetime === dateForm.property('value')) 

    displayData(newTable)
}

// event handler
dateForm.on('change', clickSelect) 




// function buildPlot() {
    
//   var url = "http://127.0.0.1:5000/dbscrape";
//   d3.json(url).then(function(response) {

//     console.log(response);

//     var data = response;

//     var layout = {
//       scope: "usa",
//       title: "COVID-19 CASES PER COUNTY",
//       showlegend: false,
//       height: 600,    
//       geo: {
//         scope: "usa",
//         projection: {
//           type: "albers usa"
//         },
//         showland: true,
//         landcolor: "rgb(217, 217, 217)",
//         subunitwidth: 1,
//         countrywidth: 1,
//         subunitcolor: "rgb(255,255,255)",
//         countrycolor: "rgb(255,255,255)"
//       }
//     };

//     Plotly.newPlot("map", data, layout);
//   });
// }

// buildPlot();

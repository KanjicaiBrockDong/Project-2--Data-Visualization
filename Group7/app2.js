// from data.js
var tableData = data;

// YOUR CODE HERE!
console.log(tableData);

//to get a reference to the table body
var tbody = d3.select("tbody");
//TO select button
var button = d3.select("#filter-btn");
var input = d3.select("#datetime");
// to select city button
var cityButton = d3.select("#filter-btn-city");
var cityInput = d3.select("#cityname");
// to select state button
var stateButton = d3.select("#filter-btn-state");
var stateInput = d3.select("#statename");
// to select country button
var countryButton = d3.select("#filter-btn-country");
var countryInput = d3.select("#countryname");
// to select shape button
var shapeButton = d3.select("#filter-btn-shape");
var shapeInput = d3.select("#shapename");


//UFO-LEVEL-1

//creating a table structure in the html file
tableData.forEach(obj => {
    //to create a row for each element
    var tRow = tbody.append("tr");
    Object.entries(obj).forEach(([key, value]) =>{
        var tData = tRow.append("td");
        tData.text(value);
    });
});


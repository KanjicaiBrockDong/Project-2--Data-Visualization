Plotly.d3.csv('us_county.csv', function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }

    var data = [{
        type: 'chloropleth',
        //Locationmode centralizes to the US
        locationmode: 'USA-states',
        //locations: unpack makes it display the states according to the column informstin chosen on the csv
        locations: unpack(rows, 'fips'),
        //z: unpack is supposed to unpack the popup by the populations
        z: unpack(rows, 'population'),
        text: unpack(rows, 'state'),
        zmin: 0,
        zmax: 17000,
        // colorscale: [
        //     [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
        //     [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
        //     [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
        // ],
        autocolorscale: true,
        colorbar: {
            title: 'Population',
            thickness: 0.2
        },
        marker: {
            line:{
                color: 'rgb(255,255,255)',
                width: 2
            }
        }
    }];

    console.log(data)

        var layout = {
            title: 'Population by State',
            geo:{
                scope: 'usa',
                showlakes: true,
                lakecolor: 'rgb(255,255,255)'
            }
        };

        Plotly.newPlot("myDiv", data, layout, {showLink: false});
});
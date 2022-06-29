//-------------------------------------------------------------------
// #1 from HW Directions
//-------------------------------------------------------------------
// Use d3.json to retrieve the data from the samples.json file
d3.json("samples.json").then((data) => {

    // Create a dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Take the array "names" from data to be the options in the dropdown menu
    data.names.forEach((id) => {
        //
        dropdownMenu.append('option').text(id).property("value", id)
    })

    //
    BuildCharts(data.names[0])
})

// This function will build various charts using plotly
function BuildCharts(selected) {

    // Display the current selected ID to the console
    console.log('The selected ID is shown below this line: ')
    console.log(selected)

    // Retrieve the data using d3
    d3.json("samples.json").then((data) => {
        
        // Display the data to the console
        console.log('The data is shown below this line')
        console.log(data);
        
        //
        let results = data.samples.filter(obj => obj.id == selected);
        
        //
        console.log('results is shown below this line')
        console.log(results);
        console.log('results[0].otu_ids show below this line');
        console.log(results[0].otu_ids);
        console.log('results[0].otu_labels show below this line');
        console.log(results[0].otu_labels);
        console.log('results[0].sample_values show below this line');
        console.log(results[0].sample_values);
        
        //--------------------------------------------------------------
        // #2 from HW Directions, create a bar chart
        //--------------------------------------------------------------
        //
        let bar_graph = {
            x: results[0].sample_values.slice(0,10).sort((a,b) => a-b),
            y: results[0].otu_ids.slice(0,10).reverse().map(function(elem) {return `OTU ${elem}`}),
            text: results[0].otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: "h"
        };

        let bar_layout = { title: 'Top 10 Bacterias Found for this ID'}
        
        let bar = [bar_graph];
        
        //Create the bar graph to be displayed to the site using id "bar"
        Plotly.newPlot("bar", bar, bar_layout); 

        //--------------------------------------------------------------
        // #3 from HW Directions, create a bubble graph
        //--------------------------------------------------------------
        //
        let bubble_graph = {
            x: results[0].otu_ids,
            y: results[0].sample_values,
            text: results[0].otu_labels,
            marker: { color: results[0].otu_ids, size: results[0].sample_values },
            mode: 'markers'
        };

        let bubble_layout = { 
            title: "Bacteria Samples Found for this ID",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Sample Value"}
        }

        // Display the scatter plot with bubbles, using id "bubble"
        Plotly.newPlot("bubble", [bubble_graph], bubble_layout)

        //--------------------------------------------------------------
        // #4 and #5 from HW Directions, display the demographic info for the ID selected
        //--------------------------------------------------------------
        //
        let meta = data.metadata.filter(obj => obj.id == selected)
        console.log("meta[0] is displayed below this line")
        console.log(meta[0])
        console.log(meta[0].id)
        console.log(meta[0].ethnicity)
        console.log(meta[0].gender)
        console.log(meta[0].age)
        console.log(meta[0].location)
        console.log(meta[0].bbtype)
        console.log(meta[0].wfreq)

        //document.getElementById('sample-metadata').innerText = JSON.stringify(meta[0], null, 1);

        // The code below will display the demographic info for the ID selected to the site
        // in the "Demographic Info" box, using the HTML id "sample-metadata"
        document.getElementById('sample-metadata').innerText = (
            'ID: ' + meta[0].id + "\n"  + 
            'Ethnicity: ' + meta[0].ethnicity + "\n"  + 
            'Gender: ' + meta[0].gender + "\n"  +
            'Age: ' + meta[0].age + "\n"  +
            'Location: ' + meta[0].location + "\n"  +
            'bbtype: ' + meta[0].bbtype + "\n"  +
            'wfreq: ' + meta[0].wfreq
        )
        
        //--------------------------------------------------------------
        // BONUS from HW Directions, display gauge chart
        //--------------------------------------------------------------
        //
        let gauge_chart = {
                domain: {x: [0,100], y: [0,100]},
                value: meta[0].wfreq,
                title: { text: 'Belly Button Washing Frequency' },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: {range: [null, 9]},
                    steps: [
                        {range: [0,1], color: 'f2ffe6',},
                        {range: [1,2], color: 'd9ffb3'},
                        {range: [2,3], color: 'bfff80'},
                        {range: [3,4], color: 'a6ff4d'},
                        {range: [4,5], color: '8cff1a'},
                        {range: [5,6], color: '73e600'},
                        {range: [6,7], color: '59b300'},
                        {range: [7,8], color: '408000'},
                        {range: [8,9], color: '264d00'},
                    ]
                }
        };

        let gauge_layout = { width: 500 };

        Plotly.newPlot('gauge', [gauge_chart], gauge_layout);
        
    })
}

//--------------------------------------------------------------
// #6 from HW Directions, update plots when new ID is selected
//--------------------------------------------------------------
//
// This function allows for new options to be selected from the drop down menu
function optionChanged(selected) {
        
    // Call the function BuildCharts that will display all data 
    // for the currently selected ID from drop down menu
    BuildCharts(selected)
}   



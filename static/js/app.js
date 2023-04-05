//create a variable for the API
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//create function to initialize page with plots
function init(data) {

    let subjectIds = Object.values(data.names);
    //populate drop down menu with for loop by using .append(<>html language</>) .text(<>your text</>) and .property("value", yourdatavalues)
    let dropDownMenu = d3.select("#selDataset");
    for (let i = 0; i < subjectIds.length; i++) {
        dropDownMenu.append("option").text(subjectIds[i]).property("value", subjectIds[i]);
    };

    //prepare variables for bar graph
    let initSubject = data.samples[0];
    let initValues = initSubject.sample_values.slice(0,10).reverse();
    let initIds = initSubject.otu_ids.slice(0,10).reverse().map(row => `OTU ${row}`);
    let initLabels = initSubject.otu_labels.slice(0,10).reverse();

    //prepare variables for bubble graph
    let bubValues = initSubject.sample_values;
    let bubIds = initSubject.otu_ids;
    let bubLabels = initSubject.otu_labels;

    //prepare variables for gauge
    let initMetaData = data.metadata[0];
    let gaugeValue = initMetaData.wfreq

    //create trace for bar graph
    let bar1 = {
        x: initValues,
        y: initIds,
        text: initLabels,
        type:"bar",
        orientation:"h"
    };

    //create bar layout for plotly
    let barLayout = {
        title:"Top 10 OTU's",
        yaxis: {
            type: "category",
            fixedrange: true
            },
        xaxis: {
            fixedrange: true
        }
    };

    //create trace for bubble graph
    let bubble1 = {
        x: bubIds,
        y: bubValues,
        text: bubLabels,
        type: "scatter",
        mode: "markers",
        opacity: 1,
        marker: {size: bubValues, color: bubIds, colorscale: "Earth"}
    };

    //create bubble layout for plotly
    let bubbleLayout = {
        title:"All OTU's",
        yaxis: {
            fixedrange: true
        },
        xaxis: {
            fixedrange: true
        }
    };

    //create trace for gauge
    let gauge1 = {
        value: gaugeValue,
        domain: {x: [0,1], y:[0,1]},
        title: {text: "Belly Button Wash Frequency\nScrubs per Week"},
        type: "indicator",
        mode: "gauge",
        gauge: {
            shape: "angular",
            axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "darkblue" },
            steps: [
                { range: [0, 3], color: "red" },
                { range: [3, 6], color: "yellow" },
                {range: [6,9], color: "green"}]}
    };

    //create layout for gauge
    let theta = 180-gaugeValue*20
    let r = .75
    let xPt = r * Math.cos(theta*.0174533)
    let yPt = r * Math.sin(theta*.0174533)

    let gaugeLayout = {
        width: 600, 
        height: 450,
        margin: { t: 115, b: 115 },
        xaxis: {
            range: [-1, 1], 
            "showgrid": false, 
            "showticklabels": false,
            fixedrange: true
        },
        yaxis: {
            range: [0, 1], 
            "showgrid": false, 
            "showticklabels": false,
            fixedrange: true
        },
        showlegend: false,
        annotations: [
            {
              ax: 0.0,
              ay: 0.0,
              axref: "x",
              ayref: "y",
              x: xPt,
              y: yPt,
              xref: "x",
              yref: "y",
              showarrow: true,
              arrowhead: 3,
              startarrowhead: 6,
              startarrowsize: .5,
              startarrowside: "start",
              arrowside: "end+start",
              arrowsize: .75,
              arrowwidth: 8,
              arrowcolor: "darkblue"
            }
          ]
    };

    //prepare data for demographic panel
    let initDemographicKeys = Object.keys(data.metadata[0]);
    let initDemographicValues = Object.values(data.metadata[0])
    let panelInfo = d3.select("#sample-metadata");
    for (let i = 0; i < initDemographicKeys.length; i++) {
        panelInfo.append("tr").text(`${initDemographicKeys[i]}: ${initDemographicValues[i]}`);
    }

    //create data array of traces for plotly
    let barArray = [bar1];
    let bubbleArray = [bubble1];
    let gaugeArray = [gauge1];

    //have plotly plot the bar, bubble, and gauge graph
    Plotly.newPlot("bar", barArray, barLayout);
    Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    Plotly.newPlot("gauge", gaugeArray, gaugeLayout);

};

//create update function for onChange trigger
function updatePlotly(selection, data) {

    //prepare variables for bar graph
    let filterSubject = data.samples.filter(function(row){return row.id == selection});
    let selectSubject = filterSubject[0]
    let selectValues = selectSubject.sample_values.slice(0,10).reverse();
    let selectIds = selectSubject.otu_ids.slice(0,10).reverse().map(row => `OTU ${row}`);
    let selectLabels = selectSubject.otu_labels.slice(0,10).reverse();

    //prepare variables for bubble graph
    let selectbubValues = selectSubject.sample_values;
    let selectbubIds = selectSubject.otu_ids;
    let selectbubLabels = selectSubject.otu_labels;

    //prepare variables for gauge
    let selectMetaData = data.metadata.filter(function(row){return row.id == selection});
    let gaugeValue = selectMetaData[0].wfreq

    //create trace for bar graph
    let bar1 = {
        x: selectValues,
        y: selectIds,
        text: selectLabels,
        type:"bar",
        orientation:"h"
    };

    //create bar layout for plotly
    let barLayout = {
        title:"Top 10 OTU's",
        yaxis: {
            type: "category",
            fixedrange: true
            },
        xaxis: {
            fixedrange: true
        }
    };

    //create trace for bubble graph
    let bubble1 = {
        x: selectbubIds,
        y: selectbubValues,
        text: selectbubLabels,
        type: "scatter",
        mode: "markers",
        opacity: 1,
        marker: {size: selectbubValues, color: selectbubIds, colorscale: "Earth"}
    };

    //create bubble layout for plotly
    let bubbleLayout = {
        title:"All OTU's",
        yaxis: {
            fixedrange: true
        },
        xaxis: {
            fixedrange: true
        }
    };

    //create trace for gauge
    let gauge1 = {
        value: gaugeValue,
        domain: {x: [0,1], y:[0,1]},
        title: {text: "Belly Button Wash Frequency\nScrubs per Week"},
        type: "indicator",
        mode: "gauge",
        gauge: {
            shape: "angular",
            axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "darkblue" },
            steps: [
                { range: [0, 3], color: "red" },
                { range: [3, 6], color: "yellow" },
                {range: [6,9], color: "green"}]}
    };

    //create layout for gauge
    let theta = 180-gaugeValue*20
    let r = .75
    let xPt = r * Math.cos(theta*.0174533)
    let yPt = r * Math.sin(theta*.0174533)

    let gaugeLayout = {
        width: 600, 
        height: 450,
        margin: { t: 115, b: 115 },
        xaxis: {
            range: [-1, 1], 
            "showgrid": false, 
            "showticklabels": false,
            fixedrange: true
        },
        yaxis: {
            range: [0, 1], 
            "showgrid": false, 
            "showticklabels": false,
            fixedrange: true
        },
        showlegend: false,
        annotations: [
            {
              ax: 0.0,
              ay: 0.0,
              axref: "x",
              ayref: "y",
              x: xPt,
              y: yPt,
              xref: "x",
              yref: "y",
              showarrow: true,
              arrowhead: 3,
              startarrowhead: 6,
              startarrowsize: .5,
              startarrowside: "start",
              arrowside: "end+start",
              arrowsize: .75,
              arrowwidth: 8,
              arrowcolor: "darkblue"
            }
          ]
    };

    //prepare data for demographic panel
    let selectDemographicKeys = Object.keys(selectMetaData[0]);
    let selectDemographicValues = Object.values(selectMetaData[0])
    let panelInfo = d3.select("#sample-metadata");
    panelInfo.text("")
    for (let i = 0; i < selectDemographicKeys.length; i++) {
        panelInfo.append("tr").text(`${selectDemographicKeys[i]}: ${selectDemographicValues[i]}`);
    }

    //create data array of traces for plotly
    let barArray = [bar1];
    let bubbleArray = [bubble1];
    let gaugeArray = [gauge1];

    //have plotly plot the bar graph
    Plotly.newPlot("bar", barArray, barLayout);
    Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    Plotly.newPlot("gauge", gaugeArray, gaugeLayout);

};

// create a call for subject id number by using dropdown option to select test subject id number, html onchange property = function(this.value)
function optionChanged(selection) {
    d3.json(url).then(function (data){
        updatePlotly(selection, data);
    });    
}

//initialize page plots
d3.json(url).then(function (data){
    init(data);
});

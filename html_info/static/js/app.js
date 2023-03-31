
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


d3.json(url).then(function (data){
    
    console.log(data);
    let samples = data.samples;
    console.log(samples);

    //use dropdown option to select test subject id number to replace samples[0]

    let sampleValues = samples[0].sample_values.slice(0,10).reverse();
    let otuIds = samples[0].otu_ids.slice(0,10).reverse().map(row => `OTU ${row}`);
    let otuLabels = samples[0].otu_labels.slice(0,10).reverse();

    trace1 = {
        x: sampleValues,
        y: otuIds,
        text: otuLabels,
        type:"bar",
        orientation:"h"
    };
    
    dataArray = [trace1];
    
    layout = {
        title:"Top 10 OTU's",
        yaxis: {
            type: "category"
          }
    };
    
    Plotly.newPlot("bar", dataArray, layout);

















});

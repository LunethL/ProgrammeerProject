/* Fanfiction.js
  Name: Sanne Meijering
  Student ID: 10783709
  Creates a SVG bar chart.
*/

// Set global variables
// Datasets
var dataset1, dataset2, dataset3;

// Height and width
var w = 900;
var h = 300;

// Padding barchart
var barPadding = 4;
var padding = {"top": 50, "left": 250, "right": 10, "bottom": 10};

// Variables bar chart
var returnValue = function(d) {return d.ffnet + d.ao3};
var shown_data = [0, 19];

// Values pie chart
var radius = Math.min(w, h) / 2;
var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);
var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);
var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) {return returnValue(d.amount); });
var color = d3.scale.ordinal()
  .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999']);

// Variables calendar and pie chart
var year = "2016"
var series = "total"
var range_year = "total"
var group = "rating"

$(document).ready(function() {

  // Create bar chart
  d3.json("Data/database1.json", function(error, data) {
    if (error) {
      console.log(error);
    }

    dataset1 = data;
    generateMain();
  });

  // Create pie chart
  d3.json("Data/database3.json", function(error, data) {
      if (error) {
        console.log(error);
      }

      dataset3 = data;
      generatePie();
  });

  // Add event to buttons
  d3.select("#ffnet").on("click", function() {
    returnValue = function(d) {return d.ffnet};
    updateMain();
    updatePie();
  });
  d3.select("#ao3").on("click", function() {
    returnValue = function(d) {return d.ao3};
    updateMain();
    updatePie();
  });
  d3.select("#total").on("click", function() {
    returnValue = function(d) {return d.ffnet + d.ao3};
    updateMain();
    updatePie();
  });
});

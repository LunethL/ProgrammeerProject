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
var w2 = 1100;
var h2 = 150;
var w3 = 500;
var h3 = 300;

// Padding barchart
var barPadding = 4;
var padding = {"top": 50, "left": 250, "right": 10, "bottom": 10};

// Variables bar chart
var returnValue = function(d) {return d.ffnet + d.ao3};
var shown_data = [0, 19];

// Values calendar chart
var cellSize = 17;
var day = d3.time.format("%w"),
    week = d3.time.format("%U"),
    percent = d3.format(".1%"),
    format = d3.time.format("%Y-%m-%d");
var color_cal = ['#fcfbfd','#efedf5','#dadaeb','#bcbddc','#9e9ac8','#807dba','#6a51a3','#54278f','#3f007d'];
var dateParse = d3.time.format("%m/%d/%Y");
var color_length = 9;
var nest;

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
var legendRectSize = radius * 0.06;
var legendSpacing = radius * 0.05;

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

  d3.json("Data/database2_complete.json", function(error, data) {
    if (error) {
      console.log(error);
    }

    dataset2 = data;
    generateCalendar();
  });

  // Create pie chart
  d3.json("Data/database3_complete.json", function(error, data) {
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
    updateCalendar2();
    updatePie();
  });
  d3.select("#ao3").on("click", function() {
    returnValue = function(d) {return d.ao3};
    updateMain();
    updateCalendar2();
    updatePie();
  });
  d3.select("#total").on("click", function() {
    returnValue = function(d) {return d.ffnet + d.ao3};
    updateMain();
    updateCalendar2();
    updatePie();
  });
  d3.select("#year").on("change", function() {
    year = $("#year").val();
    updateCalendar1();
    if (range_year == "year") {
      updatePie();
    }
  });
  d3.select("#group").on("change", function() {
    group = $("#group").val();
    updatePie();
  });
  d3.select("#range").on("change", function() {
    range_year = $("#range").val();
    updatePie();
  });
});

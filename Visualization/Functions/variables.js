/* Sets global variables */

// Datasets
var dataset1, dataset2, dataset3;

// Variables for bar chart

// Height and width for each chart
var w = 900,
    h = 300;

// Padding barchart
var barPadding = 4;
var padding = {"top": 50, "left": 250, "right": 10, "bottom": 10};

// Other variables
var returnValue = function(d) {return d.ffnet + d.ao3};
var shown_data = [0, 19];

// Variables for calendar chart
// Height, width and cell size
var w2 = 1100,
    h2 = 150;
var cellSize = 17;

// Date formats
var day = d3.time.format("%w"),
    week = d3.time.format("%U"),
    percent = d3.format(".1%"),
    format = d3.time.format("%Y-%m-%d"),
    dateParse = d3.time.format("%m/%d/%Y");

// Nested dictionary
var nest;

// Variables for pie chart
// Height and width
var w3 = 500,
    h3 = 300;

// Other measures
var radius = Math.min(w, h) / 2;
var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);
var pie = d3.layout.pie()
    .value(function(d) {return returnValue(d.amount); });
var set = ["K", "T", "M", "E", "Not Rated"];

// Size and spacing of legend
var legendRectSize = radius * 0.06;
var legendSpacing = radius * 0.05;

// Variables for both calendar and pie chart
var year = "2016";
var series = "total";
var range_year = "total";
var group = "rating";

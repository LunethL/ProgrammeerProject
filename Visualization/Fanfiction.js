/* Fanfiction.js
  Name: Sanne Meijering
  Student ID: 10783709
  Creates a SVG bar chart.
*/

var dataset1, dataset2, dataset3;
var dataset = [5, 10, 15, 20, 25];
var w = 900;
var h = 300;
var barPadding = 1;
var padding = {"top": 50, "left": 100, "right": 10, "bottom": 10}
var returnValue = function(d) {return d.ffnet + d.ao3};

$(document).ready(function() {
  d3.json("Data/database1.json", function(error, data) {
    if (error) {
      console.log(error);
    }

    dataset1 = data;
    generateMain();

    d3.select("#ffnet").on("click", function() {
      returnValue = function(d) {return d.ffnet};
      console.log(returnValue);
      updateMain();
    });
    d3.select("#ao3").on("click", function() {
      returnValue = function(d) {return d.ao3};
      updateMain();
    });
    d3.select("#total").on("click", function() {
      returnValue = function(d) {return d.ffnet + d.ao3};
      updateMain();
    });

  });
});

function generateMain() {
  max = d3.max(dataset1, function(d) {return returnValue(d)})
  yArray = [];
  for (var i = 0; i <= dataset1.length - 1; i++) {
    yArray.push(dataset1[i]["name"]);
  }

  var xScale = d3.scale.linear()
    .domain([0, max + (max / 100)])
    .range([0, w - padding["left"] - padding["right"]])
  var yScale = d3.scale.ordinal()
    .domain(yArray)
    .rangeBands([0, h - padding["top"] - padding["bottom"]]);

  svg_main = d3.select("#main")
    .attr("width", w)
    .attr("height", h);
  svg_main.selectAll("rect")
    .data(dataset1)
    .enter()
  .append("rect")
    .attr("x", padding["left"])
    .attr("y", function(d) { return yScale(d.name) + padding["top"]})
    .attr("width", function(d) {return xScale(returnValue(d))})
    .attr("height", function(d){return h / dataset1.length})
    .attr("fill", function(d) {return "rgb(0, 0, " + (returnValue(d)/100) + ")"});

    svg_main.selectAll("text")
     .data(dataset1)
     .enter()
     .append("text")
     .text(function(d) {return returnValue(d)})
     .attr("x", function(d, i) {return returnValue(d)})
     .attr("y", function(d, i) {return i * (h / dataset1.length) + 30})
     .style("visibility", "hidden");

    xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("top");

    svg_main.append("g")
      .call(xAxis)
      .attr("class", "axis")
      .attr('transform', 'translate(' + padding["left"] + ',' + padding["top"] + ')');
}

function updateMain() {
  console.log("Update")
  svg_main = d3.select("#main");
  max = d3.max(dataset1, function(d) {return returnValue(d)});
  console.log(max);
  yArray = [];
  for (var i = 0; i <= dataset1.length - 1; i++) {
    yArray.push(dataset1[i]["name"]);
  }
  var xScale = d3.scale.linear()
    .domain([0, max + (max / 100)])
    .range([0, w - padding["left"] - padding["right"]])
  var yScale = d3.scale.ordinal()
    .domain(yArray)
    .rangeBands([0, h - padding["top"] - padding["bottom"]]);

  svg_main.selectAll("rect")
    .data(dataset1)
    .transition()
    .duration(1000)
    .attr("y", function(d) { return yScale(d.name) + padding["top"]})
    .attr("width", function(d) {return xScale(returnValue(d))})
    .attr("height", function(d){return h / dataset1.length})
    .attr("fill", function(d) {return "rgb(0, 0, " + (returnValue(d)/100) + ")"});

    svg_main.selectAll("text")
     .data(dataset1)
     .enter()
     .append("text")
     .text(function(d) {return returnValue(d)})
     .attr("x", function(d, i) {return returnValue(d)})
     .attr("y", function(d, i) {return i * (h / dataset1.length) + 30})
     .style("visibility", "hidden");

    xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("top");

    svg_main.select(".axis")
      .call(xAxis)
}

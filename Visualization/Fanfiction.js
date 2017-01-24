/* Fanfiction.js
  Name: Sanne Meijering
  Student ID: 10783709
  Creates a SVG bar chart.
*/

var dataset1, dataset2, dataset3;
var w = 900;
var h = 300;
var barPadding = 4;
var padding = {"top": 50, "left": 250, "right": 10, "bottom": 10}
var returnValue = function(d) {return d.ffnet + d.ao3};
var shown_data = [0, 20]

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

    d3.json("Data/database3.json", function(error, data) {
      if (error) {
        console.log(error);
      }

      dataset3 = data;
      generatePie();
  });
});

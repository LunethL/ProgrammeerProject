/* Fanfiction.js
  Name: Sanne Meijering
  Student ID: 10783709
  Triggers generation and .
*/
$(document).ready(function() {

  // Load data for bar chart
  d3.json("Data/database1.json", function(error, data) {
    if (error) {
      console.log(error);
    }

    dataset1 = data;
    generateMain();
  });

  // Load data for calendar chart
  d3.json("Data/database2_complete.json", function(error, data) {
    if (error) {
      console.log(error);
    }

    dataset2 = data;
    generateCalendar();
  });

  // Load data for pie chart
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
    updateAll();
  });
  d3.select("#ao3").on("click", function() {
    returnValue = function(d) {return d.ao3};
    updateAll();
  });
  d3.select("#total").on("click", function() {
    returnValue = function(d) {return d.ffnet + d.ao3};
    updateAll();
  });

  // Add events to drop down menus
  d3.select("#year").on("change", function() {
    year = $("#year").val();
    updateCalendar();
    if (range_year == "year") {
      updatePie();
    }
  });
  d3.select("#group").on("change", function() {
    group = $("#group").val();
    pickSet();
    updatePie();
  });
  d3.select("#range").on("change", function() {
    range_year = $("#range").val();
    updatePie();
  });
});
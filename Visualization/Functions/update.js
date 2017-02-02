/* update.js
  Name: Sanne Meijering
  Student ID: 10783709
  Functions that update the initial charts
*/

// Update the bar chart
function updateMain() {
  // Get data and maximum value
  var temp = getDataBar();
  var max = d3.max(temp, function(d) {return returnValue(d)});

  var xScale = getxScale(max);
  var yScale = getyScale(temp);

  var svg_main = d3.select("#main");

  var slider = makeSlider();
  svg_main.select(".d3-slider")
      .call(slider);

  // Create bar chart with labels and axes
  update_SVG(svg_main, temp, max, xScale, yScale);
  addText(svg_main, temp);
  createAxis(svg_main, xScale, yScale);
}

// Update the calendar
function updateCalendar() {
  // Remove the old holder and create a new one
  var svg_cal1 = d3.select("#calendar");
  svg_cal1.select(".holder").remove();
  var svg_cal = getSVG();

  // Create the days and months
  createCalendar(svg_cal);

  // Fill days
  addData();
}

// Update the calendar
function updatePie() {
  // Get data
  if (range_year == "total") {
    var data = dataset3[series]["total"][group]
  }
  else {
    var data = dataset3[series][year][group]
  }

  // Select pie chart and remove legend and pie
  svg_pie = d3.select("#pie");
  svg_pie.selectAll('.legend').remove();
  holder = svg_pie.select(".holder");
  holder.selectAll(".arc").remove();

  var tooltip = d3.select("#pie_tool");

  // Create pie
  var g = makePath(holder, data, tooltip);

  addLegendPie(svg_pie, data);
}

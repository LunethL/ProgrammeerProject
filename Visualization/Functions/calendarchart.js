/* calendar.js
  Name: Sanne Meijering
  Student ID: 10783709
  Functions to create the calendar chart
  Original code for calendar from: http://bl.ocks.org/benlyall/b237f16dda3125423130
  I Changed the color scale to suit the data.
*/

// Creates month lines
function monthPath(t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = +day(t0), w0 = +week(t0),
      d1 = +day(t1), w1 = +week(t1);
  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      + "H" + w0 * cellSize + "V" + 7 * cellSize
      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      + "H" + (w1 + 1) * cellSize + "V" + 0
      + "H" + (w0 + 1) * cellSize + "Z";
}

// Creates the holder
function getSVG() {
  var svg_cal = d3.select("#calendar")
      .data(d3.range(Number(year), Number(year) + 1))
      .attr("width", w2)
      .attr("height", h2)
      .attr("class", "RdYlGn")
    .append("g")
      .attr("class", "holder")
      .attr("transform", "translate(" + ((w2 - cellSize * 53) / 2 - 50) + "," + (h2 - cellSize * 7 - 15) + ")");
  return svg_cal;
}

// Creates the days of the calendar
function createCalendar(svg_cal) {
  var rect = svg_cal.selectAll(".day")
      .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
    .enter().append("rect")
      .attr("class", "day")
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("x", function(d) { return week(d) * cellSize; })
      .attr("y", function(d) { return day(d) * cellSize; })
      .style("fill", function(d) { return d; })
      .datum(format);

  // Add date to day as title
  rect.append("title")
      .text(function(d) { return d; });

  // Add months with monthPath
  svg_cal.selectAll(".month")
      .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
    .enter().append("path")
      .attr("class", "month")
      .attr("d", monthPath);
}

// Add new data to calendar
function addData() {
  // Get data
  data = dataset2[series][year];
  data.forEach(function(d) {
  nest = d3.nest()
    .key(function(d) { return d.date; })
    .map(data);
  });

  // Find the maximum, the right color scheme and step size for the color scheme
  max = d3.max(data, function(d) {return returnValue(d.amount)});
  color_cal = getColor(max);
  step = max / color_cal.length;

  // Fill days with the correct colors
  var svg_cal = d3.select("#calendar").select(".holder")
  var rect = svg_cal.selectAll(".day")
  rect.filter(function(d) { return d in nest; })
      .attr("class", function(d) { return "day " + (Math.round(returnValue(nest[d][0].amount) / step) - 1); })
      .attr("class", function(d) { return "day"; })
      .style("fill", function(d) { return color_cal[Math.round(returnValue(nest[d][0].amount) / step) - 1] })
    .select("title")
      .text(function(d) { return d + ": " + returnValue(nest[d][0].amount) });

  addLegendCal();
}

// Picks color scheme for calendar
function getColor(max) {
  var color_cal = ['#efedf5','#dadaeb','#bcbddc','#9e9ac8','#807dba','#6a51a3','#54278f','#3f007d'];
  while (max <= color_cal.length) {
    color_cal.pop();
  }
  return color_cal;
}

// Adds legend to calendar
function addLegendCal() {
  var svg_origin = d3.select("#calendar")
  svg_origin.selectAll('.legend').remove();

  // Create the legend
  var legend = svg_origin.selectAll('.legend')
    .data(color_cal)
    .enter().append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
        var height = legendRectSize + legendSpacing / 2;
        var offset = h2/2 - (height * color_cal.length)/2 ;
        var horz = 1000;
        var vert = (i * height) + offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

  // Add colored squares to legend
  legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', function(d) { return d; })
        .style('stroke', 'rgb(0,0,0)');

  // Add text to legend
  legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize)
      .text(function(d) {
        if (max <= color_cal.length) {
          return Math.round(color_cal.indexOf(d) * step + 1) + "-" + Math.round((color_cal.indexOf(d) + 1) * step);
        }
        else {
          return Math.round(color_cal.indexOf(d) * step + 1);
        }
      })
      .style('font-size', '12px');
}

/* barchart.js
  Name: Sanne Meijering
  Student ID: 10783709
  Functions for bar chart creation
  Inspired by the tutorial book Interactive Data Visualization for the Web
  by Scott Murray
*/

// Creates sorted temporary dataset
function getDataBar() {
  dataset1.sort(sortNumber);
  var temp = dataset1.slice(shown_data[0], shown_data[1]);
  return temp;
}

// Sorts all data by value
function sortNumber(a,b) {
    return returnValue(b) - returnValue(a);
}

// Creates the x-scale
function getxScale(max) {
  var xScale = d3.scale.linear()
    .domain([0, max + (max / 100)])
    .range([0, w - padding["left"] - padding["right"]]);
  return xScale;
}

// Creates the y-scale by making an array of names
function getyScale(temp) {
  var yArray = [];
  for (var i = 0; i <= (temp.length) - 1; i++) {
    yArray.push(temp[i]["name"]);
  }
  var yScale = d3.scale.ordinal()
    .domain(yArray)
    .rangeBands([0, h - padding["top"] - padding["bottom"]]);

  return yScale;
}

// Creates the slider for the bar chart
function makeSlider() {
  var slider = d3.slider()
      .scale(d3.scale.linear().domain([dataset1.length - 19, 0]))
      .value(20)
      .orientation("vertical")
      .on("slide", function(evt, value) {
          shown_data[0] = Math.floor(value);
          shown_data[1] = Math.floor(value + 19);
          updateMain();
        });
  return slider;
}

// Creates tooltip for the barchart
function makeTipBar() {
  var tooltip_bar = d3.select("#main_div")
    .append('div')
      .attr('class', 'tooltip')
      .attr('id', 'main_tool')
  return tooltip_bar;
}

// Updates bar chart values
function update_SVG(svg_main, temp, max, xScale, yScale) {
  svg_main.selectAll("rect")
    .data(temp)
    .transition()
    .duration(1000)
    .attr("y", function(d) { return yScale(d.name) + padding["top"]})
    .attr("width", function(d) {return xScale(returnValue(d))})
    .attr("height", function(d){return (h / temp.length) - barPadding})
    .attr("fill", function(d) {return "rgb(0, 0, " + (Math.floor((returnValue(d) / max) * 255)) + ")"});
}

// Adds text to the y-axis
function addText(svg_main, temp) {
  svg_main.selectAll("text")
   .data(temp)
   .enter()
   .append("text")
   .text(function(d) {return returnValue(d)})
   .attr("x", function(d, i) {return returnValue(d)})
   .attr("y", function(d, i) {return i * (h / temp.length) + 30});
}

// Creates both axes
function createAxis(svg_main, xScale, yScale) {
  xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("top");
  svg_main.select(".xaxis")
    .call(xAxis);

  yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");
  svg_main.select(".yaxis")
    .call(yAxis);
}

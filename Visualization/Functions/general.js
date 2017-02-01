/* Functions used in multiple files */

// General functions
// Update all graphs (for button clicks)
function updateAll() {
  renewText("None");
  series = "total";
  shown_data = [0, 19];
  updateMain();
  updateCalendar();
  updatePie();
}

// Renews the text when a series is selected
function renewText(word) {
  d3.select("#series_text").remove();
  body = d3.select('body');
  body.append('text')
    .attr('id', 'series_text')
    .text("Series selected: " + word);
}

function pickSet() {
  if (group == "rating") {
    set = ["K", "T", "M", "E", "Not Rated"];
  }
  else if (group == "words") {
    set = ["<1K","1K-5K", "5K-10K", "10K-20K", "20K-40K", "40K-60K", "60K-100K", ">100K"];
  }
  else {
    set = ["1", "2-5", "5-10", "10-20", "20-40", "40-60", "60-100", ">100"];
  }
}

// Bar chart functions
// Sorts bar chart by value
function sortNumber(a,b) {
    return returnValue(b) - returnValue(a);
}

// Creates sorted temporary dataset
function getDataBar() {
  dataset1.sort(sortNumber);
  var temp = dataset1.slice(shown_data[0], shown_data[1]);
  return temp;
}

// Creates the xScale
function getxScale(max) {
  var xScale = d3.scale.linear()
    .domain([0, max + (max / 100)])
    .range([0, w - padding["left"] - padding["right"]]);
  return xScale;
}

// Creates the yScale
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

// Adds text to the yAxis
function addText(svg_main, temp) {
  svg_main.selectAll("text")
   .data(temp)
   .enter()
   .append("text")
   .text(function(d) {return returnValue(d)})
   .attr("x", function(d, i) {return returnValue(d)})
   .attr("y", function(d, i) {return i * (h / temp.length) + 30});
}

// Create axis
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

// Calendar chart function
// Creates months
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

// Adds year label
function addYear(svg_cal) {
  svg_cal.append("text")
      .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
      .style("text-anchor", "middle")
      .text(function(d) { return d; });
}

// Creates holder and adds data
function getSVG() {
  var svg_cal = d3.select("#calendar")
      .data(d3.range(Number(year), Number(year) + 1))
      .attr("width", w2)
      .attr("height", h2)
      .attr("class", "RdYlGn")
    .append("g")
      .attr("class", "holder")
      .attr("transform", "translate(" + ((w2 - cellSize * 53) / 2 - 50) + "," + (h2 - cellSize * 7 - 1) + ")");
  return svg_cal;
}

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

  rect.append("title")
      .text(function(d) { return d; });

  svg_cal.selectAll(".month")
      .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
    .enter().append("path")
      .attr("class", "month")
      .attr("d", monthPath);
}

// Add new data to calendar
function addData() {
  data = dataset2[series][year];
  data.forEach(function(d) {
  nest = d3.nest()
    .key(function(d) { return d.date; })
    .map(data);
  });

  max = d3.max(data, function(d) {return returnValue(d.amount)});
  color_cal = getColor(max);
  step = max / color_cal.length;

  var svg_cal = d3.select("#calendar").select(".holder")
  var rect = svg_cal.selectAll(".day")
  rect.filter(function(d) { return d in nest; })
      .attr("class", function(d) { return "day " + (Math.round(returnValue(nest[d][0].amount) / step) - 1); })
      .attr("class", function(d) { return "day"; })
      .style("fill", function(d) { return color_cal[Math.round(returnValue(nest[d][0].amount) / step) - 1] })
    .select("title")
      //.text(function(d) { return d + ": " + percent(data[d]); });
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

  legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', function(d) { return d; })
        .style('stroke', 'rgb(0,0,0)');

  legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize)
      .text(function(d) {
        if (max > color_cal.length) {
          return Math.round(color_cal.indexOf(d) * step + 1) + "-" + Math.round((color_cal.indexOf(d) + 1) * step);
        }
        else {
          return Math.round(color_cal.indexOf(d) * step + 1);
        }
      })
      .style('font-size', '12px');
}

// Pie chart functions
// Make a tooltip
function makeTip() {
  var tooltip = d3.select("#pie_div")
    .append('div')
      .attr('class', 'tooltip')
      .attr('id', 'pie_tool')
  return tooltip;
}

function makePath(holder, data, tooltip) {
  var g = holder.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc")
      .on('mouseover', function(d) {
        tooltip.html("<div>" + setLabel(d.data[group]) + ": <br>" + returnValue(d.data.amount) + "</div>");
        tooltip.style("display", "inline")
            .style("left", (d3.event.pageX - 34) + "px")
            .style("top", (d3.event.pageY - 12) + "px");
      })
      .on('mouseout', function() {
        tooltip.style('display', 'none')
      });

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return setColor(d.data[group]); });
}

function setColor(data) {
  var color_scheme = ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'];
  for (i in set) {
    if (data == set[i]) {
      color = color_scheme[i];
    }
  }

  return color;
}

function addLegendPie(svg_pie, data) {

  var legend = svg_pie.selectAll('.legend')
    .data(set)
    .enter().append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
        var height = legendRectSize + legendSpacing;
        var offset =  h3/2 - height * set.length / 2;
        var horz = 350;
        var vert = (i * height + offset);
        return 'translate(' + horz + ',' + vert + ')';
    });

  legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', function(d) { return setColor(d)})
        .style('stroke', function(d) { return setColor(d)});

  legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize)
      .text(function(d) { return setLabel(d); });
}

function setLabel(data) {
  if (group == "rating") {
    if (data == "K") {
      label = "General Audiences";
    }
    else if (data == "T") {
      label = "Teen and up";
    }
    else if (data == "M") {
      label = "Mature";
    }
    else if (data == "E") {
      label = "Explicit";
    }
    else {
      label = data;
    }
  }
  else if (group == "words") {
    label = data + " words";
  }
  else {
    label = data + " chapters";
  }

  return label;
}

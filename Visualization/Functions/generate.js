function generateMain() {
  var temp = getDataBar();
  var max = d3.max(temp, function(d) {return returnValue(d)});
  var xScale = getxScale(max);
  var yScale = getyScale(temp);

  var slider = makeSlider();
  d3.select("#main_div").append("div")
    .call(slider);

  var svg_main = d3.select("#main")
    .attr("width", w)
    .attr("height", h);

  tooltip_bar = makeTipBar();

  svg_main.selectAll("rect")
    .data(temp)
    .enter()
  .append("rect")
    .attr("x", padding["left"])
    .on("click", function (d) {
      series = d.name;
      renewText(series);
      updateCalendar();
      updatePie();
    })
    .on('mouseover', function(d) {
      tooltip_bar.html("<div>" + setLabel(d.name) + ": <br>" + returnValue(d) + "</div>");
      tooltip_bar.style("display", "inline")
          .style("left", (d3.event.pageX - 34) + "px")
          .style("top", (d3.event.pageY - 12) + "px");
    })
    .on('mouseout', function() {
      tooltip_bar.style('display', 'none')
    });

  update_SVG(svg_main, temp, max, xScale, yScale);
  addText(svg_main, temp);

  svg_main.append("g")
      .attr("class", "axis xaxis")
      .attr('transform', 'translate(' + padding["left"] + ',' + padding["top"] + ')');
  svg_main.append("g")
      .attr("class", "axis yaxis")
      .attr('transform', 'translate(' + padding["left"] + ',' + padding["top"] + ')');
  createAxis(svg_main, xScale, yScale);
}

function generateCalendar() {
  var svg_cal = getSVG();
  addYear(svg_cal);
  createCalendar(svg_cal);
  updateCalendar();
}

function generatePie() {
  var data = dataset3["total"]["total"]["rating"]

  var svg_pie = d3.select("#pie");
  svg_pie.width = w3
      .height = h3;

  var tooltip = makeTip();
  var holder = svg_pie.append('g')
      .attr('transform', 'translate(' + (w3/3) + ',' + (h3/2) + ')')
      .attr('class', 'holder');

  var g = makePath(holder, data, tooltip);
  addLegendPie(svg_pie, data);
}

function updateMain() {
  var temp = getDataBar();
  var max = d3.max(temp, function(d) {return returnValue(d)});
  var xScale = getxScale(max);
  var yScale = getyScale(temp);

  var svg_main = d3.select("#main");

  var slider = makeSlider();
  svg_main.select(".d3-slider")
      .call(slider);

  update_SVG(svg_main, temp, max, xScale, yScale);
  addText(svg_main, temp);
  createAxis(svg_main, xScale, yScale);
}

function updateCalendar() {
  var svg_cal1 = d3.select("#calendar");
  svg_cal1.select(".holder").remove();
  var svg_cal = getSVG();

  addYear(svg_cal);
  createCalendar(svg_cal);
  addData();
}

function updatePie() {
  if (range_year == "total") {
    var data = dataset3[series]["total"][group]
  }
  else {
    var data = dataset3[series][year][group]
  }

  svg_pie = d3.select("#pie");
  svg_pie.selectAll('.legend').remove();
  holder = svg_pie.select(".holder");
  holder.selectAll(".arc").remove();

  var tooltip = d3.select("#pie_tool")
  var g = makePath(holder, data, tooltip);
  addLegendPie(svg_pie, data);
}

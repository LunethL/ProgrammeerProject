function updateMain() {
  dataset1.sort(sortNumber);
  temp = dataset1.slice(shown_data[0], shown_data[1]);

  svg_main = d3.select("#main");
  max = d3.max(temp, function(d) {return returnValue(d)});

  var slider = d3.slider()
      .value([shown_data[0], shown_data[1]])
      .orientation("vertical")
      .on("slide", function(evt, value) {
          shown_data[0] = value[0]
          shown_data[1] = value[1]
        });

  svg_main.select(".d3-slider")
    .call(slider);

  yArray = [];
  for (var i = 0; i <= (temp.length) - 1; i++) {
    yArray.push(temp[i]["name"]);
  }
  var xScale = d3.scale.linear()
    .domain([0, max + (max / 100)])
    .range([0, w - padding["left"] - padding["right"]])
  var yScale = d3.scale.ordinal()
    .domain(yArray)
    .rangeBands([0, h - padding["top"] - padding["bottom"]]);

  svg_main.selectAll("rect")
    .data(temp)
    .transition()
    .duration(1000)
    .attr("y", function(d) { return yScale(d.name) + padding["top"]})
    .attr("width", function(d) {return xScale(returnValue(d))})
    .attr("height", function(d){return (h / temp.length) - barPadding})
    .attr("fill", function(d) {return "rgb(0, 0, " + ((returnValue(d) / max) * 255) + ")"});

    svg_main.selectAll("text")
     .data(temp)
     .enter()
     .append("text")
     .text(function(d) {return returnValue(d)})
     .attr("x", function(d, i) {return returnValue(d)})
     .attr("y", function(d, i) {return i * (h / temp.length) + 30})

    xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("top");

    svg_main.select(".xaxis")
      .call(xAxis)

    yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");

    svg_main.select(".yaxis")
      .call(yAxis)
}

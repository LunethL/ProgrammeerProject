function generateMain() {
  dataset1.sort(sortNumber);
  temp = dataset1.slice(shown_data[0], shown_data[1]);

  max = d3.max(temp, function(d) {return returnValue(d)})
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

  svg_main = d3.select("#main")
    .attr("width", w)
    .attr("height", h);

    console.log(shown_data);
  var slider = d3.slider()
      .scale(d3.scale.linear().domain([dataset1.length - 19, 0]))
      .value(20)
      .orientation("vertical")
      .on("slide", function(evt, value) {
          shown_data[0] = Math.floor(value);
          shown_data[1] = Math.floor(value + 19);
          updateMain()
        });

  d3.select("#main_div").append("div")
    .call(slider);

  svg_main.selectAll("rect")
    .data(temp)
    .enter()
  .append("rect")
    .attr("x", padding["left"])
    .attr("y", function(d) { return yScale(d.name) + padding["top"]})
    .attr("width", function(d) {return xScale(returnValue(d))})
    .attr("height", function(d){return (h / temp.length) - barPadding})
    .attr("fill", function(d) {return "rgb(0, 0, " + (Math.floor((returnValue(d) / max) * 255)) + ")"});

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

    svg_main.append("g")
      .call(xAxis)
      .attr("class", "axis xaxis")
      .attr('transform', 'translate(' + padding["left"] + ',' + padding["top"] + ')');

    yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");

    svg_main.append("g")
      .call(yAxis)
      .attr("class", "axis yaxis")
      .attr('transform', 'translate(' + padding["left"] + ',' + padding["top"] + ')');
}

function generatePie() {
  var data = dataset3["total"]["total"]
  console.log(data)

  svg_pie = d3.select("#pie")
  svg_pie.width = w
    .height = h

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {return returnValue(d.amount); });

  var g = svg_pie.append('g')
      .attr('transform', 'translate(' + (w/4) + ',' + (h/2) + ')')
      .attr('class', 'holder');

  var tooltip = d3.select("#pie")
    .append('div')
      .attr('class', 'tooltip')
      .attr('transform', 'translate(' + (w/4) + ',' + (h/2) + ')');

  var g = g.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc")

  g.on('mouseover', function(d) {
        tooltip.html("<div>" + d.data.rating + "</div>");
        tooltip.style('display', 'block')
      })
      .on('mouseout', function() {
        tooltip.style('display', 'block')
      });

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.rating); });
}

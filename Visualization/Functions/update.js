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

function updateCalendar1() {

  var svg_cal1 = d3.select("#calendar");
  svg_cal1.select(".holder").remove();

  svg_cal = svg_cal1
    .data(d3.range(Number(year), Number(year) + 1))
      .attr("width", w2)
      .attr("height", h2)
      .attr("class", "RdYlGn")
    .append("g")
      .attr("class", "holder")
      .attr("transform", "translate(" + ((w2 - cellSize * 53) / 2 - 50) + "," + (h2 - cellSize * 7 - 1) + ")");

  svg_cal.append("text")
      .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
      .style("text-anchor", "middle")
      .text(function(d) { return d; });

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

  updateCalendar2();
}

function updateCalendar2() {
  data = dataset2[series][year];
  data.forEach(function(d) {
  nest = d3.nest()
    .key(function(d) { return d.date; })
    .map(data);
  });

  max = d3.max(data, function(d) {return returnValue(d.amount)});
  step = max / color_cal.length;

  var svg_cal = d3.select("#calendar").select(".holder")
  var rect = svg_cal.selectAll(".day")
  rect.filter(function(d) { return d in nest; })
      .attr("class", function(d) { return "day " + (Math.floor(returnValue(nest[d][0].amount) / step)); })
      .attr("class", function(d) { return "day"; })
      .style("fill", function(d) { return color_cal[Math.floor(returnValue(nest[d][0].amount) / step)] })
    .select("title")
      //.text(function(d) { return d + ": " + percent(data[d]); });
      .text(function(d) { return d + ": " + returnValue(nest[d][0].amount) });

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
          .style('stroke', 'rgb(0,0,0)')

    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize)
        .text(function(d) { return Math.round(color_cal.indexOf(d) * step) + "-" + Math.round((color_cal.indexOf(d) + 1) * step); })
        .style('font-size', '12px');
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

  var g = holder.selectAll(".arc")
      .data(pie(data))
      .sort(null)
    .enter().append("g")
      .attr("class", "arc")

  g.on('mouseover', function(d) {
        tooltip.html("<div>" + d.data[group] + "</div>");
        tooltip.style('display', 'hidden')
      })
      .on('mouseout', function() {
        tooltip.style('display', 'block')
      });

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data[group]); });

    var legend = svg_pie.selectAll('.legend')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'legend')
      .attr('transform', function(d, i) {
          var height = legendRectSize + legendSpacing;
          var offset =  (h3/2) - (height * data.length) / 2;
          var horz = 350;
          var vert = (i * height + offset);
          return 'translate(' + horz + ',' + vert + ')';
      });

    legend.append('rect')
          .attr('width', legendRectSize)
          .attr('height', legendRectSize)
          .style('fill', function(d) { return color(d.data[group])})
          .style('stroke', function(d) { return color(d.data[group])});

    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize)
        .text(function(d) { return d.data[group]; });
}

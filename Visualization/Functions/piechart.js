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

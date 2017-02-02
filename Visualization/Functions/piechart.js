/* piechart.js
  Name: Sanne Meijering
  Student ID: 10783709
  Functions to create the pie chart
*/

// Make a tooltip
function makeTip() {
  var tooltip = d3.select("#pie_div")
    .append('div')
      .attr('class', 'tooltip')
      .attr('id', 'pie_tool')
  return tooltip;
}

// Make the pie itself and add the tooltip events
function makePath(holder, data, tooltip) {
  // Create the circle
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

  // Add the pie slices and fill them
  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return setColor(d.data[group]); });
}

// Sets the color of the pie slices
function setColor(data) {
  var color_scheme = ['#377eb8','#4daf4a','#e41a1c','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'];
  for (i in set) {
    if (data == set[i]) {
      color = color_scheme[i];
    }
  }

  return color;
}

// Adds a legend to the pie chart
function addLegendPie(svg_pie, data) {

  // Add the legend
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

  // Add the colored squares to the legend
  legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', function(d) { return setColor(d)})
        .style('stroke', function(d) { return setColor(d)});

  // Add the text to the legend
  legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize)
      .text(function(d) { return setLabel(d); });
}

// Returns the appropriate label for the bar chart legend and tooltip
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
    if (data == "1") {
      label = data + " chapter";
    }
    else {
      label = data + " chapters"
    }
  }

  return label;
}

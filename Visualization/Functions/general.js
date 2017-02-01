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

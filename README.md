# Fanfiction visualization
 This local site shows information from the fanfiction sites fanfiction.net and archiveofourown.org. 
 
## Installation
To open the file, 
If you wish to update the database, downloading the repository is necessary.
This visualization will not work offline, as it downloads jQuery and d3.tip from the web.

## Features
* A bar chart shows the total number of fanfiction written per series. By default is shows the sum of the fanfiction written for each site.
* The slider next to the bar chart can be used to scroll down to the series for which less fanfiction is written.
* Hover over a bar to see the exact number of fanfiction written.
* Click on a bar to select a series, this updates the other charts to show only the information for the selected series.
* Click on the buttons above the bar chart to update all charts to show information from only one site or return to total. The slider and selected series will be reset.
* The calendar chart shows the number of fanfiction published per day for one year. The year shown can be changed with the drop down menu in the title. Note that the scale changes according to the maximum amount of fanfiction published in one day that year, and will change depending on the selected series and year.
* Hovering over a day in the calendar chart will show you the date and the exact number of fanfiction written that day.
* The pie chart shows age rating of fanfiction by default, but this can be changed to word range or number of chapters by changing the selection with the drop down menu. 
* The second drop down menu can be used to switch between all fanfiction and the fanfiction written in the year selected in the calendar chart's drop down menu.
* Hovering over a piece of the pie chart will show the category and the exact amount of fanfiction that belongs to that category.

## Updating the data
Scrapers are included and can be used to update the data. Note that dataset 1 can be updated in mere minutes, while updating dataset 2 and 3 will take several hours for each site.

### Updating dataset 1
1. Delete ffnet.json and ao3.json from the Data map if they exist.
2. Open the command window and go to the 'Visualization' directory (run commands from any other directory will cause misplacement of files or an error).
3. Run the commands 'scrapy runspider Scrapers\FFscraper.py -o ffnet.json' and 'scrapy runspider Scrapers\AO3scraper.py -o ao3.json' to scrape the data for dataset 1.
4. Fuse the datasets with 'python Data\Dataset1Creator.py'

### Updating dataset 2 and 3
Both datasets are updated with the same scraper, one site at a time. Note that the second scraper uses the information from the first, but does not overwrite it. If you stop either scraper halfway, the old information will still be overwritten, thus: 
#### WARNING: stopping the second scraper halfway will update the second dataset and will leave you with incomplete data in the visualizations.

1. Open the command window and go to the 'Visualization' directory (run commands from any other directory will cause misplacement of files or an error).
2. Run the command 'python Scrapers\FFscraper2.py' to scrape fanfiction.net
3. Run the command 'python Scrapers\AO3scraper2.py' to scrape archiveofourown.org

## Copyright
I do not own d3.min.js or d3.slider.js.

### Copyright d3.min.js:
Copyright 2010-2016 Mike Bostock
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the author nor the names of contributors may be used to
  endorse or promote products derived from this software without specific prior
  written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

### Copyright d3.slider.js:
Copyright (c) 2013, Bjorn Sandvik
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

  Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

  Neither the name of the {organization} nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


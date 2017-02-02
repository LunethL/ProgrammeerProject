# Report on the visualization

## Description of the visualization
This visualization uses three graphs to show in a bar chart how many fanfiction has been written per series on fanfiction.net and 
archiveofourown.org. It also has a calendar chart that shows the number of fanfiction written per day in one year and a pie chart 
that shows the age rating, word range or chapter range. Clicking on a bar in the bar graph will update the other charts to show only 
information about that series.

## Technical design
### Components and linkage
This site contains three charts: one bar chart, one calendar chart and one pie chart. Each chart has it's own database. Clicking on
a bar in the bar chart will update the other charts to show information of only one series. This selection is reset if a button is clicked.

Other components of the visualization are:
* Buttons: These update all three charts to show information about both sites or only one site. The default is only one site.
* A slider: This update only the bar chart. It allows the user to scroll down the chart to see less popular series. The default is the top 20 and is reset once a button is clicked
* One drop-down menu that alters the calendar chart. With this menu, the year shown in the graph can be changed. The default is 2016 and the range is 2010 to 2016.
* Two drop-down menus that alter the pie chart. The first changes the information shown to age rating, chapter range or word range, age rating is the default. The second switches between all fanfiction and the fanfiction written in one year. If the selection is set to the latter, the year selected in the drop-down menu near the calendar will be selected and the pie chart will be updated if this year is changed. In this case, total is the default.

### Detailed description
#### Recording selections
All selections are recorded in global variables, as many affect the same charts or multiple charts and otherwise updating a chart would require all necessary variables to be obtained from the html. The buttons change the variable function 'returnVariable' and affects all charts. As all data consists of a number for ff.net and for ao3, but not a total, returnVariable return either the number of one series or the sum of both. The slider changes the variable 'shown_data', which affects only the bar chart. The drop-down menu of the calendar chart changes 'year', which affects the calendar chart and also the pie chart if range_year is set to year. The drop down menus in the pie chart can change 'group' and 'range_year' respectively, both of which only affect the pie chart. The clicked bar is recorded in 'series' and affects the calendar chart and pie chart.


#### Datasets
Three datasets are used, one for each chart.
* Dataset 1 is used for the bar chart. It was obtained by scraping the TV series pages from each site and fusing them. It's formatted as a list of json objects. It contains the name of the series (name), the amount of fanfiction per site (ffnet, ao3) and the hrefs to the fanfiction for each site. The hrefs are not used in the graphs, but are used for the creation of datasets 2 and 3.
* Dataset 2 is used for the calendar chart. It was obtained by scraping every fanfiction from each site, using the hrefs recorded in dataset 1. It contains the number of fanfictions published per series, per day, per site. It's selection format is dataset2>series>year. Series also has a total, which contains the combined data for all series.
* Dataset 3 is used for the pie chart. It was obtained together with dataset 2. It contains information per series, per year. It's selection format is dataset3>series>year>group. Both series and year have a total. Group can be age rating, word range and chapter range.

#### File order
The datasets are all loaded immediately. Once a dataset is loaded and the html is ready, the chart is generated. I chose for this order because dataset 3 is large and dataset 2 is huge, so they take a long time to load. Selections become available after the calendar chart is loaded. Only the drop-down menus of the pie chart become available after the pie chart is loaded, as it has no effect on any other chart. All actions above are in the Fanfiction.net file.

variables.js sets all global variables, while general.js contains all functions that affect multiple charts or non-chart things like global variables and selections. The functions that generate each chart are in generate.js, the functions that update the charts are in update.js. Each chart also has a file named after a chart, which contains chart-specific functions. Most of these are called upon by both generate.js and update.js

## Challenges
### What I learned
I like web scrapers, but the scrapers in this case were harder to make than ever. Both second scrapers required me to scrape multiple pages, thus I had to make a crawling scraper. On top of that, I had to count rather than scrape the data, which was much harder than I had predicted. As I can do both now, I'd say I've gotten pretty good at making scrapers.

When I started making the charts, I realized I had absolutely no idea how d3 actually worked. Through a tutorial and lots of practice, I finally understand what function(d) does and why it should be d.data.value, and not d.value, when working with pie data. Things like that, and many more things, became clear to me as I made this visualization. I finally feel like I know what I'm doing when I'm making a graph and I can understand most example code I've come across. I also got stuck on small problems often, so I'm better at solving

### Changes in technical design
My original design (from before the design document) contained imdb information, but I removed it because I felt I would have to scrape too much series (ca. 130.000 series). It feels rather stupid now, as I've scraped all fanfiction from two sites (definitely more than a million fanfictions, maybe even 2 million+). On the other hand, no matter how I would've done it, the all-important key.json would have taken far more time to make. As it took around 10 hours to make already, making the key would've taken far too long. As such, I'm still happy with my design.

I haven't made too many changes compared to the original design document. I've removed the 'Complete/Incomplete' function, as I know from experience that many authors don't change the status of their fanfic after completing it and scraping completion from fanfiction.net turned out to be quite hard. I've also removed the 'host' function from the pie chart, as this was saved in dataset 1. I would've had to make a completely new pie chart function to show that. I decided against using a stacked bar chart for total for the same reason. Other than that, I've done everything the way I described it in DESIGN.md, except some changes in layout.

### Optional features
Of the optional features that I named in the old readme, some where implemented while other weren't, both due to time constraints and to problems I ran into while. The pie chart originally showed only age rating and host, but in the end I removed host (see above) and did implement chapter range and word range immediately. The slider also turned out to be more important than I thought, so I added it as well. I also added tooltips, as I had wanted. A real-time scraper soon proved to be impossible. For dataset1 alone it might have been viable, but scraping all fanfiction from a popular series like supernatural takes over 10 minutes.

### Future improvements
There are a few things I didn't have time to implement, but I would've liked to. An option to sort bars alphabetically would've made it easier to find a specific series, highlighting the currently selected button would've been more visually appealing than the current window that shows selection. A checkbox that allowed you to switch between resetting the series on button click and retaining the series would've made it easier to compare the two sites. I also thought about making the drop-down menu of the calendar chart variable. As some series have been released in 2012 and others in 1980, a variable menu would have prevented empty calendar charts from existing and would've shown all the data available.

## Design choices
I've chosen a blue theme because blue is the color of fanfiction.net. Archiveofourown has a slightly weaker relation to red, but I thought blue was more suitable than the angry red. For both the bar chart and calendar chart I used a one-hue color scale, as they are continous. I wanted to use a continuous color scale for the calendar chart, but found it would've been much harder to make a legend. The pie chart is rainbow-colored to show the differences clearly. As the pie is sorted by size to make it easier to see which catergory is the biggest, a single hue scale might have reflected the data type better, but would've made it hard to differ between the categories. I did set mature to red and explicit to purple as they are 'dangerous' (for little kids), while General Audiences and Teen got blue and green, as they are 'safe' (for work).

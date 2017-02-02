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
All selections are recorded in global variables, as many affect the same charts or multiple charts and otherwise updating a chart would require all necessary variables to be obtained from the html. The buttons change the variable 'returnVariable', which will be explained later, and affects all charts. The slider changes the variable 'shown_data', which affects only the bar chart. The drop-down menu of the calendar chart changes 'year', which affects the calendar chart and also the pie chart if range_year is set to year. The drop down menus in the pie chart can change 'group' and 'range_year' respectively, both of which only affect the pie chart. The clicked bar is recorded in 'series' and affects the calendar chart and pie chart.

#### Datasets
Three datasets are used, one for each chart.
* Dataset 1 is used for the bar chart. It was obtained by scraping the TV series pages from each site and fusing them. It's formatted as a list of json objects. It contains the name of the series (name), the amount of fanfiction per site (ffnet, ao3) and the hrefs to the fanfiction for each site. The hrefs are not used in the graphs, but are used for the creation of datasets 2 and 3.
* Dataset 2 is used for the calendar chart. It was obtained by scraping every fanfiction from 

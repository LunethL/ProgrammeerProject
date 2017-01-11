# ProgrammeerProject
ProgrammeerProject voor mprog

## Project Proposal: The World of TV Series
### By Sanne Meijering


## Goal
The goal of this visualization is to create an overview of the the fanfiction for TV series. This visualization will allow the user to find out which TV series have a lot of fanfiction, when most fanfiction was written and more. This is done using a horizontal bar chart. A caledar chart shows for each series when the fanfiction was written, while a pie chart shows the distibution of rating (all audiences/teen/mature), host site, word range, chapter range and complete/incomplete fanfiction. Only fanfiction with more than 50 stories on one fanfiction site will be included

## Features
### Minimum viable product:
•	Main chart (horizontal stacked bar chart) which show the amount of fanfiction of each TV series
•	Secondary chart (calendar chart) which shows the amount of fanfiction written per year.
•	Secondary chart (pie chart) which shows the distribution of rating and host website.
•	Extra interactivity 1: Switch between total fanfiction, fanfiction on fanfiction.net and fanfiction on archiveofourown with buttons.
•	Extra interactivity 2: Switch between fanfiction rating distribution and host distribution.
•	Linking: Clicking on main chart will update other charts

### Optional features (by approximate implementation order):
•	Tooltips
•	CSS style update
•	Added views to pie chart: word range, chapter range, complete/incomplete
•	Added view to main chart: Number of fanfiction added and/or updated in the last month
•	Slider: Main chart shows data for all series and has a slider
•	Added view to main graph: Alphabetical order
•	Top 10 most popular
•	Search function
•	Real-time scraper: Scrapes the data on update

## Sketch of the web page
![](doc/Sketch2.jpg)

## Data sources
Fanfiction.net (FF.net) and Archiveofourown (AO3) are the largest Western fanfiction communities and unlike other websites they are sorted and easy to scrape. Both are used as there may be huge differences in the amount of fanfiction written for one series between the two.

Data will be obtained using scrapers, which will be fused into a JSON file. This file contains not only the titles and data of each series, but also the exact name under which it is found in each data source. These may be altered by hand if they cannot be found by the scraper. Updates of the data will only replace the data values and rankings and will use the names found in the initial scrape to find them.

## Decomposing the visualization
This visualization needs a HTML file, a javascript file in which the visualization is made, a css file for the style and a three-or-more-in-one scraper which scrapes all necessary data and fuses it into a JSON file. The scraper then has to be altered to update rather than renew the dataset.

The visualization itself consists of three parts: a chart (most likely a horizontal grouped bar chart) that shows rating and amount of fanfiction, a bar chart that shows the amount of fanfiction written per time unit and a pie chart which shows rating and host website.

## Possible technical problems
I expect the visualization to go relatively smoothly, but I foresee trouble with the tv series names for the scraper. Because of this I want it to save the name of each series for each site, as that way I can change all wrong names manually once and then update it using those names. Of the visualization itself, the slider is likely to cause the most trouble but luckily that feature isn't that important. I also had a lot of trouble with tooltips in previous assignments, so I expect to spend quite a bit of time on them.

## Similar visualizations
I've found that most visualizations on the subject seem to visualize the rating per episode in a scatter plot. One site was dedicated to this and added two scaling options (0-10 and automatic) and trend lines for each season separately and for the series overall. These cannot be used however, unless I wish to scrape even more.

Another graph showed popularity in a bar chart with horizontal bars. This may work well for my visualization as a higher position in the graph shows a higher popularity better than a position more to the right. In this subject most visualizations are actually tables, and a rotated bar chart mimics this. Other than that graph, I could only find tables and a few charts that were like the first: well-designed but not useable for me.

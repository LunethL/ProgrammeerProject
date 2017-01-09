# ProgrammeerProject
ProgrammeerProject voor mprog

## Project Proposal: The World of TV Series
## By Sanne Meijering

## Goal
The goal of this visualization is to create an overview of the rating and the number of  TV series written. This is done using a horizontal bar chart. An additional bar chart shows for each series when the fanfiction was written, while a pie chart shows which percentage of fanfiction is hosted on the website fanfiction.net and which percentage is hosted on the website archiveofourown.org

## Introduction
The quality of TV series is usually quantified through ratings of critics and viewers. However, neither of these measures how many people are engaged with the series and become an active part of its fanbase. Fanfiction, fanart and other fan-made materials can give an indication of the influence of a series on its watchers.

## Variables
Data is divided into two variables: quality and influence.
Quality: How well-liked a series is.
Influence: How big the active fanbase is (with active fanbase being the people that post in communities, draw fanart and/or write fanfiction).

## Features
### Minimum viable product:
•	Main chart (bar chart or similar) which show the rating and amount of fanfiction of the top n TV series
•	Secondary chart (line graph/bar chart or similar) which shows the amount of fanfiction written per year, month (one year) and day (one week) for one series (onclick of main chart)
•	Secondary chart (pie chart) which shows the percentage of fanfiction on fanfiction.net and the percentage of fanfiction on archiveofourown.
•	Extra interactivity 1: Switch between sort by highest rating and sort by most fanfiction with buttons
•	Extra interactivity 2: Switch between fanfiction per year, month and day with a drop-down menu

### Optional features (by approximate implementation order):
•	Tooltips
•	CSS style update
•	Added view to main graph: Number of fanfiction added and/or updated in the last month
•	Search function: Allows searching within the top n and highlights it in chart
•	Slider: Main chart shows data for all series and has a slider
•	Search function: for all series
•	Added data: RottenTomatoes rating
•	Real-time scraper: Scrapes the data on update

## Sketch of the web page
![](doc/sketch.jpg)

## Data sources
Rating: IMBD, RottenTomatoes
Fanfiction: Fanfiction.net, Archiveofourown.org

IMBD is chosen as the first data source as I'm familiar with its HTML. For the rating a crawling scraper will be necessary. RottenTomatoes could be an interesting second data source, as it has a unique way of measuring quality: they use the percentage of positive ratings rather than the ratings themselves.

Fanfiction.net (FF.net) and Archiveofourown (AO3) are the largest Western fanfiction communities that I'm aware of. Both are used as there may be huge differences in the amount of fanfiction written for one series between the two.
Fanart and community activity are not easy to s not concentrated on a few sites like fanfiction is. Thus sites like DeviantArt, Pinterest and Reddit probably won't display community activity reliably.

Data will be obtained using scrapers and fused into a JSON file. This file contains not only the titles and data of each series, but also the exact name under which it is found in each data source. These may be altered by hand if they cannot be found by the scraper. Updates of the data will only replace the data values and rankings and will use the names found in the initial scrape to find them.

I chose TV series over any other entertainment platform as books, movies and games sometimes have multiple installments and might appear on multiple platforms. Each of those has its own rating but their fanfiction is put under the same name. TV series are usually given an overall rating, are less likely to be ports from other categories and have a higher chance of having a fanfiction category by the exact same name, which makes scraping easier.

## Decomposing the visualization
This visualization needs a HTML file, a javascript file in which the visualization is made, a css file for the style and a three-or-more-in-one scraper which scrapes all necessary data and fuses it into a JSON file. The scraper then has to be altered to update rather than renew the dataset.

The visualization itself consists of three parts: a chart (most likely a horizontal grouped bar chart) that shows rating and amount of fanfiction, a bar chart that shows the amount of fanfiction written per time unit and a pie chart which shows on which website the fanfiction is hosted.

## Possible technical problems
I expect the visualization to go relatively smoothly, but I foresee trouble with the tv series names for the scraper. Because of this I want it to save the name of each series for each site, as that way I can change all wrong names manually once and then update it using those names. Of the visualization itself, the slider is likely to cause the most trouble but luckily that feature isn't that important. I also had a lot of trouble with tooltips in previous assignments, so I expect to spend quite a bit of time on them.

## Similar visualizations
I've found that most visualizations on the subject seem to visualize the rating per episode in a scatter plot. One site was dedicated to this and added two scaling options (0-10 and automatic) and trend lines for each season separately and for the series overall. These cannot be used however, unless I wish to scrape even more.

Another graph showed popularity in a bar chart with horizontal bars. This may work well for my visualization as a higher position in the graph shows a higher popularity better than a position more to the right. In this subject most visualizations are actually tables, and a rotated bar chart mimics this. Other than that graph, I could only find tables and a few charts that were like the first: well-designed but not useable for me.

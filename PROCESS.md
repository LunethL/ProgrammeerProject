# Week 1
## Day 1
I decided on doing a visualization about fanfiction.
The visualization is going to look like this:
![](doc/Sketch.jpg)
I might need to change one of the bar charts into a different type of graph.
Possibly a line chart for the minor bar graph.

## Day 2
I made scrapers for IMDB, Fanfiction.net and Archiveofourown. All three work, but I have trouble with the series on IMDB.
The TV series on IMDB also include anime, which are under different headers on the fanfiction sites. To solve this I also scraped the anime pages.
Another problem with IMDB is that it was around 130.000 TV series, while both fanfiction sites together might have half the number of series in all categories.

## Day 3
I decided to not use the IMDB information. Instead, I'll focus more on scraping the fanfiction sites. I might end up adding information from another site, but for now I'll keep it simple.
I made a sketch with the new layout: 
![](doc/Sketch2.jpg)

## Day 4
I started making a title key, as the same series might not be under the same title on different sites. There's a lot of series, so I thought about setting a minimum amount of fanfiction later. Removing IMDB did reduce the work a lot.
I tried making a complete key and then remove the ones that have less than 50 fanfiction. It was still a lot of work, so I changed the method and now I only include tv series with over 50 stories on one site.
Then, I add the same tv series on the other site even if it has less than 50 stories.

## Day 5
I made the HTML for the visualization, no new plans made.

# Week 2

## Day 1
I completed the key, scraped all series from both sites and then used the key to make a database. With this, the first database is complete and I can start on the second database.

## Day 2

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

I completed the first scraper that goes through all fanfics. Scraping whether the story was complete or incomplete turned out to be tricky, so I decided to scrape the language of the fanfic. Scraping all fanfiction takes some time, as expected, but it's at an acceptable level (by my calculation it will take around one hour and a half to scrape 1 million fanfics). I looked at the html of the second fanfiction site, and it looked a lot easier to scrape. As I made a seperate methods file, of which multiple methods can be used for the second scraper, I expect the second scraper to be done much faster. I also set up both the databases and made a sketch of them:
![](doc/Database_sketch.jpg)

## Day 3

The first scraper had a run time of 2,5 hours. I completed the second scraper that goes through all fanfics and ran it overnight.

## Day 4

I made a start on the bar chart. I realized the data was not in a useable format for D3, so I changed the format so that the level that has to be used by D3 is a list instead of a json/dict for database 1

## Day 5

I added multiple views on the bar chart, one for each site and one total.

# Week 3

## Day 1

Over the weekend I updated and ran the second scaper for fanfiction.net. It was still not quite the right format though, so I updated the scraper again. I also updated the second scraper for ao3. I ran the fanfiction.net scraper over night.

## Day 2

The runtime of the FF.net scraper has increased to 3,5 hours, but the format is perfect

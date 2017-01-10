# Name: Sanne Meijering
# Student number: 10783709
'''
This script scrapes AO3 and outputs a JSON file with tv series.
'''
import scrapy

TARGET_URL1 = "http://archiveofourown.org/media/TV%20Shows/fandoms"
TARGET_URL2 = "http://archiveofourown.org/media/Anime%20*a*%20Manga/fandoms"

# Scraper that moves to the next page
class AO3Spider(scrapy.Spider):
    name = "ao3"
    start_urls = [TARGET_URL1, TARGET_URL2]

    # Parse page and continue to next page
    def parse(self, response):
        table = response.css('ol.alphabet')
        for series in table.xpath('li//li'):
            fanfiction = int(series.css('::text')[2].extract()[18:-14])

            if fanfiction >= 10:
                yield {
                    'name': series.css('a::text').extract_first(),
                    'fanfiction': fanfiction,
                    'href': series.css('a::attr(href)').extract_first()
                }

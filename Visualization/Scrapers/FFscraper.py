# Name: Sanne Meijering
# Student number: 10783709
'''
This script scrapes FF.net and outputs a JSON file with tv series,
amount of fanfiction and a link to the series page.
'''
import scrapy, logging

logging.disable(logging.DEBUG)

TARGET_URL = "https://www.fanfiction.net/tv/"

# Scraper that moves to the next page
class FFSpider(scrapy.Spider):
    name = "fanfiction"
    start_urls = [TARGET_URL]

    # Parse page and continue to next page
    def parse(self, response):
        table = response.css("div#list_output")
        for series in table.css('div'):
            fanfiction = series.css('span.gray::text').extract_first()[1:-1]
            if fanfiction[-1] == 'K':
                fanfiction = float(fanfiction[:-1]) * 1000
            fanfiction = int(fanfiction)

            yield {
                'name': series.css('a::attr(title)').extract_first(),
                'fanfiction': fanfiction,
                'href': series.css('a::attr(href)').extract_first()[1:-1]
            }

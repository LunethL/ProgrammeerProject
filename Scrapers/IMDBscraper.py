# Name: Sanne Meijering
# Student number: 10783709
'''
This script scrapes IMDB and outputs a JSON file with tv series.
'''
import scrapy

TARGET_URL = "http://www.imdb.com/search/title?sort=user_rating,desc&start=1&title_type=tv_series"

# Scraper that moves to the next page
class IMDBSpider(scrapy.Spider):
    name = "imdb"
    start_urls = [TARGET_URL]

    # Parse page and continue to next page
    def parse(self, response):
        for series in response.css('div.lister-item'):
            yield {
                'name': series.css('img::attr(alt)').extract_first(),
                'genre': series.css('span.genre::text').extract_first()[1:-12],
                'rating': series.css("strong::text").extract_first(),
                'votes':
                'release_date': series.css("span.lister-item-year::text").extract_first()[1:5],
                'rank': series.css("span.lister-item-index::text").extract_first()[:-1]
            }

        next_page = response.css('a.lister-page-next::attr(href)').extract_first()
        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)

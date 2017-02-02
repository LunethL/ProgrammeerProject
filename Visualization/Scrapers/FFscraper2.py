#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Name: Sanne Meijering
# Student number: 10783709

'''
This script scrapes FF.net and outputs a JSON file with fanfic information by
date and by series
'''

import Methods as M
import scrapy, codecs, json, logging
from scrapy.crawler import CrawlerProcess

logging.disable(logging.DEBUG)

# Set host and make a href to series key
host = "ffnet"
key = M.key_maker(host)

# Create databases
database2 = {}
database3 = {}

# Crawling webscraper
class FFSpider(scrapy.Spider):
    name = "fanfiction2"

    # Set the start urls using database1
    urls = M.FF_url_maker()
    start_urls = urls

    # Parse page
    def parse(self, response):
        # Get the series
        href = str(response).split("/")[4]
        series = key[href]

        # Extract the data of each fanfic and insert it into the databases
        for fanfic in response.css("div.z-list"):
            data = fanfic.css("div.z-padtop2::text").extract_first()
            rating, chapters, words = M.FF_extract_data(data)

            date = fanfic.css("span::text").extract()
            date = date[-1]
            date = M.FF_get_date(date)

            if words > 0 and chapters > 0:
                M.insert_data(database2, database3, host, series, date, rating, chapters, words)

        # Go to the next page if there is one
        navigation = response.css("center")
        if navigation:
            next_button = navigation[0]
            if next_button.css("a::text")[-1].extract()[:-2] == "Next":
                next_page = next_button.css('a::attr(href)')[-1].extract()
                next_page = response.urljoin(next_page)
                yield scrapy.Request(next_page, callback=self.parse)

process = CrawlerProcess({
    'USER_AGENT': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)'
})

# Start crawling
process.crawl(FFSpider)
process.start()

# Write to json file
with codecs.open('Data/database2.json', 'w', encoding='utf-8') as f:
    json.dump(database2, f, ensure_ascii=False, sort_keys = True, indent=4, separators=(',', ': '))
with codecs.open('Data/database3.json', 'w', encoding='utf-8') as f:
    json.dump(database3, f, ensure_ascii=False, sort_keys = True, indent=4, separators=(',', ': '))

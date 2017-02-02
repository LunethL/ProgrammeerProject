#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Name: Sanne Meijering
# Student number: 10783709

'''
This script scrapes AO3.org and outputs a JSON file with fanfic information by
date and by series
'''

import Methods as M
import scrapy, codecs, json, logging
from scrapy.crawler import CrawlerProcess

logging.disable(logging.DEBUG)

# Set host and make a href to series key
host = "ao3"
key = M.key_maker(host)

# Load databases
with open('Data/database2.json') as data_file:
    database2 = json.load(data_file)
with open('Data/database3.json') as data_file:
    database3 = json.load(data_file)

# Crawling webscraper
class AO3Spider(scrapy.Spider):
    name = "ao32"

    # Set the start urls using database1
    urls = M.AO3_url_maker()
    start_urls = urls

    # Parse page
    def parse(self, response):
        # Get the series
        href = str(response).split("/")[4]
        series = key[href]

        # Extract the data of each fanfic and insert it into the databases
        for fanfic in response.css("li.blurb"):
            date, rating, chapters, words = M.AO3_extract_data(fanfic)

            if words > 0 and chapters > 0:
                M.insert_data(database2, database3, host, series, date, rating, chapters, words)

        # Go to the next page if there is one
        next_button = response.css("li.next")
        if next_button:
            next_page = next_button[0].css('a::attr(href)').extract_first()
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)

process = CrawlerProcess({
    'USER_AGENT': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)'
})

# Start crawling
process.crawl(AO3Spider)
process.start()

# Write to json file
with codecs.open('Data/database2_complete.json', 'w', encoding='utf-8') as f:
    json.dump(database2, f, ensure_ascii=False, sort_keys = True, indent=4, separators=(',', ': '))
with codecs.open('Data/database3_complete.json', 'w', encoding='utf-8') as f:
    json.dump(database3, f, ensure_ascii=False, sort_keys = True, indent=4, separators=(',', ': '))

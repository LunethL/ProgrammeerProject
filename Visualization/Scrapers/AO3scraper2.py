#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Name: Sanne Meijering
# Student number: 10783709

'''
This script scrapes AO3.org and outputs a JSON file with fanfic information by
date and by series
'''

import Methods as M
import scrapy
import codecs, json
import logging
from scrapy.crawler import CrawlerProcess

logging.disable(logging.DEBUG)

host = "ao3"
key = M.key_maker(host)
with open('Data/database2.json') as data_file:
    database2 = json.load(data_file)
with open('Data/database3.json') as data_file:
    database3 = json.load(data_file)

# Scraper that moves to the next page
class AO3Spider(scrapy.Spider):
    name = "ao32"
    urls = M.AO3_url_maker()
    start_urls = urls

    # Parse page and continue to next page
    def parse(self, response):
        href = str(response).split("/")[4]
        series = key[href]

        for fanfic in response.css("li.blurb"):
            date, rating, language, chapters, words = M.AO3_extract_data(fanfic)

            if words > 0 and chapters > 0:
                M.insert_data(database2, database3, host, series, date, rating, language, chapters, words)

        next_button = response.css("li.next")
        if next_button:
            next_page = next_button[0].css('a::attr(href)').extract_first()
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)
        else:
            logging.info(series + " done")

process = CrawlerProcess({
    'USER_AGENT': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)'
})

process.crawl(AO3Spider)
process.start()

# Write to json file
with codecs.open('Data/database2_complete.json', 'w', encoding='utf-8') as f:
    json.dump(database2, f, ensure_ascii=False, sort_keys = True, indent=4, separators=(',', ': '))
with codecs.open('Data/database3_complete.json', 'w', encoding='utf-8') as f:
    json.dump(database3, f, ensure_ascii=False, sort_keys = True, indent=4, separators=(',', ': '))

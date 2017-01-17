#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Name: Sanne Meijering
# Student number: 10783709

'''
This script scrapes FF.net and outputs a JSON file with fanfic information by
date and by series
'''

import Methods as M
import scrapy
import codecs, json
import logging
from scrapy.crawler import CrawlerProcess

logging.disable(logging.DEBUG)

host = "ffnet"
key = M.key_maker(host)
database2 = {}
database3 = {}

# Scraper that moves to the next page
class FFSpider(scrapy.Spider):

    name = "fanfiction2"
    urls = M.FF_url_maker()
    start_urls = urls

    # Parse page and continue to next page
    def parse(self, response):
        href = str(response).split("/")[3:5]
        href = "/".join(href)
        series = key[href]

        for fanfic in response.css("div.z-list"):
            data = fanfic.css("div.z-padtop2::text").extract_first()
            rating, language, chapters, words = M.FF_extract_data(data)

            date = fanfic.css("span::text").extract()
            if len(date) == 2:
                date = date[1]
            else:
                date = date[0]
            date = M.FF_get_date(date)

            if words > 0 and chapters > 0:
                M.insert_data(database2, database3, host, series, date, rating, language, chapters, words)

        line = response.css("center")
        if line:
            line = line[0]
            if line.css("a::text")[-1].extract()[:-2] == "Next":
                next_page = line.css('a::attr(href)')[-1].extract()
                next_page = response.urljoin(next_page)
                yield scrapy.Request(next_page, callback=self.parse)

process = CrawlerProcess({
    'USER_AGENT': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)'
})

process.crawl(FFSpider)
process.start()

# Write to json file
with codecs.open('database2.json', 'w', encoding='utf-8') as f:
    json.dump(database2, f, ensure_ascii=False, sort_keys = True, indent=4, separators=(',', ': '))
with codecs.open('database3.json', 'w', encoding='utf-8') as f:
    json.dump(database3, f, ensure_ascii=False, sort_keys = True, indent=4, separators=(',', ': '))

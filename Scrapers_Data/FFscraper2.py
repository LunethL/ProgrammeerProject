# Name: Sanne Meijering
# Student number: 10783709
'''
This script scrapes FF.net and outputs a JSON file with fanfic information by
date and by series
'''

import scrapy, json

with open('database1.json') as data_file:
    database1 = json.load(data_file)

# Scraper that moves to the next page
class FFSpider(scrapy.Spider):
    def url_maker():
        urls = []
        head = "https://www.fanfiction.net/"
        tail = "/?&srt=1&r=10"

        for title in database1:
            body = database1[title]["ffnet_href"]
            url_string = [head, body, tail]
            url = "".join(url_string)
            urls.append(url)

    name = "fanfiction2"
    start_urls = url_maker()

    # Parse page and continue to next page
    def parse(self, response):
        

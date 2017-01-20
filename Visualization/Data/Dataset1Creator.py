# Name: Sanne Meijering
# Student number: 10783709
'''
This program uses the json-files from the FFscraper and AO3scraper to make a
dataset.
'''

import json, codecs

# Open files
with open('ffnet.json') as data_file:
    ffnet = json.load(data_file)
with open('ao3.json') as data_file:
    ao3 = json.load(data_file)
with open('key.json') as data_file:
    key = json.load(data_file)

# Create and fill database
database = []

for title in key:
    name = key[title]

    if name["ffnet"] != "FAIL":
        for series in ffnet:
            if series["name"] == name["ffnet"]:
                ffnet_fanfic = series["fanfiction"]
                ffnet_href = series["href"]
    else:
        ffnet_fanfic = 0
        ffnet_href = "FAIL"

    if name["ao3"] != "FAIL":
        for series in ao3:
            if series["name"] == name["ao3"]:
                ao3_fanfic = series["fanfiction"]
                ao3_href = series["href"]
    else:
        ao3_fanfic = 0
        ao3_href = "FAIL"

    database.append({"name": title, "ffnet": ffnet_fanfic, "ffnet_href": ffnet_href, "ao3": ao3_fanfic, "ao3_href": ao3_href})

# Write to json file
with codecs.open('database1.json', 'w', encoding='utf-8') as f:
    json.dump(database, f, ensure_ascii=False, sort_keys = True, indent=4, separators=(',', ': '))

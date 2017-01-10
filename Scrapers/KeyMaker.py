# encoding: utf-8
import json, codecs

with open('imdb.json') as data_file:
    imdb = json.load(data_file)
with open('ffnet.json') as data_file:
    ffnet = json.load(data_file)
with open('ao3.json') as data_file:
    ao3 = json.load(data_file)

tvdatabase = {}

for series in imdb:
    tvdatabase[series["name"]] = {"imdb": series["name"], "ffnet": "FAIL", "ao3": "FAIL"}

for series in ffnet:
    if series["name"] in tvdatabase:
        series_point = tvdatabase[series["name"]]
        series_point["ffnet"] = series["name"]
    else:
        tvdatabase[(series["name"])] = {"imdb": "FAIL", "ffnet": series["name"], "ao3": "FAIL"}

for series in ao3:
    title = series["name"]
    if title[-5:] == " (TV)":
        title = title[:-5]

    if title in tvdatabase:
        series_point = tvdatabase[title]
        series_point["ao3"] = series["name"]
    else:
        tvdatabase[title] = {"imdb": "FAIL", "ffnet": "FAIL", "ao3": series["name"]}

# Write to json file
with codecs.open('key2.json', 'w', encoding='utf-8') as f:
    json.dump(tvdatabase, f, ensure_ascii=False, sort_keys = True, indent=4, separators=(',', ': '))

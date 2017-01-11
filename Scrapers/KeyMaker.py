# encoding: utf-8
import json, codecs

with open('ffnet.json') as data_file:
    ffnet = json.load(data_file)
with open('ao3.json') as data_file:
    ao3 = json.load(data_file)

tvdatabase = {}

for series in ffnet:
    tvdatabase[(series["name"])] = {"ffnet": series["name"], "ao3": "FAIL"}

for series in ao3:
    title = series["name"]
    if title[-5:] == " (TV)":
        title = title[:-5]

    if title in tvdatabase:
        series_point = tvdatabase[title]
        series_point["ao3"] = series["name"]
    else:
        tvdatabase[title] = {"ffnet": "FAIL", "ao3": series["name"]}

# Write to json file
with codecs.open('key.json', 'w', encoding='utf-8') as f:
    json.dump(tvdatabase, f, ensure_ascii=False, sort_keys = True, indent=4, separators=(',', ': '))

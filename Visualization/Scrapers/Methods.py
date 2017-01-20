import json
from datetime import datetime, timedelta

# Makes key for all series for either site
def key_maker(host):
    with open('database1.json') as data_file:
        database1 = json.load(data_file)
    key = {}
    host_key = "_".join([host, "href"])

    for entry in database1:
        href = database1[entry][host_key]
        if href != "FAIL":
            href = href.split("/")[2]
            key[href] = database1[entry][name]
    return key

# Makes urls for all series on FF.net
def FF_url_maker():
    with open('database1.json') as data_file:
        database1 = json.load(data_file)
    urls = []
    head = "https://www.fanfiction.net/"
    tail = "/?&srt=1&r=10"

    for title in database1:
        body = database1[title]["ffnet_href"]
        if body != "FAIL":
            url = "".join([head, body, tail])
            urls.append(url)

    return urls

# Makes urls for all series on AO3.org
def AO3_url_maker():
    with open('database1.json') as data_file:
        database1 = json.load(data_file)
    urls = []
    head = "http://archiveofourown.org"

    for title in database1:
        body = database1[title]["ao3_href"]
        if body != "FAIL":
            url = "".join([head, body])
            urls.append(url)

    return urls

# Extracts dates from the fanfiction.net date
def FF_get_date(date):
    if date[-1].isalpha():
        letter = date[-1]
        date = int(date[:-1])

        if letter == "s":
            date = datetime.now() - timedelta(seconds=date)
        elif letter == "m":
            date = datetime.now() - timedelta(minutes=date)
        elif letter == "h":
            date = datetime.now() - timedelta(hours=date)

    else:
        date = date.split("/")
        if len(date) == 3:
            year = int(date[2])
        else:
            year = datetime.now().year

        date = datetime(year, int(date[0]), int(date[1]))

    return date

# Extracts rating, language, chapters and words from fanfiction data
def FF_extract_data(data):
    data = data.split(" ")

    rating = data[1][0]
    language = data[3]

    if data[5] == "Chapters:":
        chapters = int(data[6])
        words = data[9].split(",")
    else:
        chapters = int(data[8])
        words = data[11].split(",")
    words = int("".join(words))

    return rating, language, chapters, words

# Extracts date, rating, language, chapters and words from fanfiction data
def AO3_extract_data(data):
    rating_list = ["General Audiences", "Teen And Up Audiences", "Mature", "Explicit", "Not Rated"]
    rating_symbols = ["K", "T", "M", "E", "N"]
    month_list = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    rating = data.css("span.rating::attr(title)").extract_first()
    for i in range(len(rating_list)):
        if rating == rating_list[i]:
            rating = rating_symbols[i]

    date = data.css("p.datetime::text").extract_first().split(" ")
    if date[0] == "":
        date = date[1:]
    for i in range(len(month_list)):
        if date[1] == month_list[i]:
            date[1] = i + 1
    date = datetime(int(date[2]), date[1], int(date[0]))

    language = data.css("dd.language::text").extract_first()
    words = data.css("dd.words::text").extract_first().split(",")
    words = "".join(words)
    chapters = data.css("dd.chapters::text").extract_first().split("/")[0]

    return date, rating, language, chapters, words

# Checks whether a key appear in a database, adds it if it doesn't. If a key has
# a nested dictionary, returns key's dictionary
def check_key(database, key, type_key):
    if type_key == "middle":
        if not key in database:
            database[key] = {}
        return database[key]

    if type_key == "end":
        if key in database:
            database[key] += 1
        else:
            database[key] = 1

# Inserts data into database2.
def insert_data2(database2, host, series, date):
    row1_identifier = ["total", series]
    row2_identifier = ["total", date.year]

    for i in range(len(row1_identifier)):
        row1 = check_key(database2, row1_identifier[i], "middle")
        for j in range(len(row2_identifier)):
            row2 = check_key(row1, row2_identifier[j], "middle")
            row3 = check_key(row2, date.month, "middle")
            row4 = check_key(row3, date.day, "middle")
            check_key(row4, host, "end")

# Inserts data into database3.
def insert_data3(database3, host, series, year, rating, language, words, chapters):
    row1_identifier = ["total", series]
    row2_identifier = ["total", year]
    row3_identifier = ["rating", "language", "words", "chapters"]
    final_keys = [rating, language, words, chapters]

    for i in range(len(row1_identifier)):
        row1 = check_key(database3, row1_identifier[i], "middle")
        for j in range(len(row2_identifier)):
            row2 = check_key(row1, row2_identifier[j], "middle")
            for k in range(len(final_keys)):
                row3 = check_key(row2, row3_identifier[k], "middle")
                row4 = check_key(row3, final_keys[k], "middle")
                check_key(row4, host, "end")

# Inserts data into the databases
def insert_data(database2, database3, host, series, date, rating, language, chapters, words):
    word_key = [0, 1000, 5000, 10000, 20000, 40000, 60000, 100000]
    word_list = ["<1K","1K-5K", "5K-10K", "10K-20K", "20K-40K", "40K-60K", "60K-100K", ">100K"]
    chapter_key = [0, 1, 5, 10, 20, 40, 60, 100]
    chapter_list = ["1", "2-5", "5-10", "10K-20", "20-40", "40-60", "60-100", ">100"]

    for i in range(len(word_key)):
        if words > word_key[i]:
            word_range = word_list[i]
        if chapters > chapter_key[i]:
            chapter_range = chapter_list[i]

    insert_data2(database2, host, series, date)
    insert_data3(database3, host, series, date.year, rating, language, word_range, chapter_range)

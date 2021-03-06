import json, datetime
from datetime import datetime, timedelta

# Makes key for all series for either site
def key_maker(host):
    # Set up some variables and get data
    with open('Data/database1.json') as data_file:
        database1 = json.load(data_file)
    key = {}
    host_key = "_".join([host, "href"])

    # Get href and name from database and put them into the key
    for entry in database1:
        href = entry[host_key]
        if href != "FAIL":
            if host == "ffnet":
                href = href.split("/")[1]
            else:
                href = href.split("/")[2]
            key[href] = entry["name"]
    return key

# Makes urls for all series on FF.net
def FF_url_maker():
    # Set up urls and download data
    with open('Data/database1.json') as data_file:
        database1 = json.load(data_file)

    # Set head and tail of url
    urls = []
    head = "https://www.fanfiction.net/"
    tail = "/?&srt=1&r=10"

    # Join the url and add it to the list
    for entry in database1:
        body = entry["ffnet_href"]
        if body != "FAIL":
            url = "".join([head, body, tail])
            urls.append(url)

    return urls

# Makes urls for all series on AO3.org
def AO3_url_maker():
    # Set up urls and download data
    with open('Data/database1.json') as data_file:
        database1 = json.load(data_file)
    urls = []

    # Set head of url
    head = "http://archiveofourown.org"

    # Join the url and add it to the list
    for entry in database1:
        body = entry["ao3_href"]
        if body != "FAIL":
            url = "".join([head, body])
            urls.append(url)

    return urls

# Extracts dates from the fanfiction.net date
def FF_get_date(date):

    # If it's been posted recently, it will show how long ago rather than
    # the date. Change it to the date (don't take current date, 17h ago will
    # probably no be the same day)
    if date[-1].isalpha():
        letter = date[-1]
        date = int(date[:-1])

        if letter == "s":
            date = datetime.now() - timedelta(seconds=date)
        elif letter == "m":
            date = datetime.now() - timedelta(minutes=date)
        elif letter == "h":
            date = datetime.now() - timedelta(hours=date)

    # If it's in date format, change it to date
    else:
        date = date.split("/")
        if len(date) == 3:
            year = int(date[2])
        else:
            year = datetime.now().year

        date = datetime(year, int(date[0]), int(date[1]))

    # Remove the time from the date
    date = datetime.date(date)

    return date

# Extracts rating, chapters and words from fanfiction.net data
def FF_extract_data(data):
    # Data is formatted in simple html text, so split by space
    data = data.split(" ")

    # Get rating, change K+ to K (it's not used by AO3)
    rating = data[1][0]

    # Get chapters and words after checking whether genres are included
    if data[5] == "Chapters:":
        chapters = int(data[6])
        words = data[9].split(",")
    else:
        chapters = int(data[8])
        words = data[11].split(",")
    words = int("".join(words))

    return rating, chapters, words

# Extracts date, rating, chapters and words from archiveofourown data
def AO3_extract_data(data):
    # Rating method is different and months are with letters, set both up for conversion
    rating_list = ["General Audiences", "Teen And Up Audiences", "Mature", "Explicit", "Not Rated"]
    rating_symbols = ["K", "T", "M", "E", "Not Rated"]
    month_list = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    # Get rating and convert it to FF.net rating
    rating = data.css("span.rating::attr(title)").extract_first()
    for i in range(len(rating_list)):
        if rating == rating_list[i]:
            rating = rating_symbols[i]

    # Get date and convert it to date format
    date = data.css("p.datetime::text").extract_first().split(" ")
    if date[0] == "":
        date = date[1:]
    for i in range(len(month_list)):
        if date[1] == month_list[i]:
            date[1] = i + 1
    date = datetime(int(date[2]), date[1], int(date[0]))
    date = datetime.date(date)

    # Get words and chapters. Check first if there are words
    words = data.css("dd.words::text").extract_first()
    if words:
        words = words.split(",")
        words = int("".join(words))
    else:
        words = 0
    chapters = int(data.css("dd.chapters::text").extract_first().split("/")[0])

    return date, rating, chapters, words

# Checks whether a key appear in a database, adds it if it doesn't
def check_key(database, key, type_key):
    if type_key == "dict":
        if not key in database:
            database[key] = {}
        return database[key]

    if type_key == "list":
        if not key in database:
            database[key] = []
        return database[key]

# Inserts data into database2.
def insert_data2(database2, host, series, date):
    row1_identifier = ["total", series]

    # Select series
    for i in range(len(row1_identifier)):
        row1 = check_key(database2, row1_identifier[i], "dict")
        row2 = check_key(row1, str(date.year), "list")
        in_array = 0

        # Select date and add to amound
        for j in range(len(row2)):
            if row2[j]["date"] == str(date):
                in_array = 1
                row2[j]["amount"][host] += 1

        # If date does not appear, add new date
        if in_array == 0:
            if host == "ffnet":
                row2.append({"date": str(date), "amount": {"ffnet": 1, "ao3": 0}})
            else:
                row2.append({"date": str(date), "amount": {"ffnet": 0, "ao3": 1}})



# Inserts data into database3.
def insert_data3(database3, host, series, year, rating, words, chapters):
    row1_identifier = ["total", series]
    row2_identifier = ["total", str(year)]
    row3_identifier = ["rating", "words", "chapters"]
    final_keys = [rating, words, chapters]

    # Select series
    for i in range(len(row1_identifier)):
        row1 = check_key(database3, row1_identifier[i], "dict")
        # Select year
        for j in range(len(row2_identifier)):
            row2 = check_key(row1, row2_identifier[j], "dict")
            # Select group
            for k in range(len(final_keys)):
                row3 = check_key(row2, row3_identifier[k], "list")
                in_array = 0

                # Add to correct value if it exists
                for l in range(len(row3)):
                    if row3[l][row3_identifier[k]] == final_keys[k]:
                        in_array = 1
                        row3[l]["amount"][host] += 1

                # If it doesn't exist, create a new value
                if in_array == 0:
                    if host == "ffnet":
                        row3.append({row3_identifier[k]: final_keys[k], "amount": {"ffnet": 1, "ao3": 0}})
                    else:
                        row3.append({row3_identifier[k]: final_keys[k], "amount": {"ffnet": 0, "ao3": 1}})

# Inserts data into the databases
def insert_data(database2, database3, host, series, date, rating, chapters, words):
    # Set list for conversion from number to range
    word_key = [0, 1000, 5000, 10000, 20000, 40000, 60000, 100000]
    word_list = ["<1K","1K-5K", "5K-10K", "10K-20K", "20K-40K", "40K-60K", "60K-100K", ">100K"]
    chapter_key = [0, 1, 5, 10, 20, 40, 60, 100]
    chapter_list = ["1", "2-5", "5-10", "10-20", "20-40", "40-60", "60-100", ">100"]

    for i in range(len(word_key)):
        # Convert words and chapters to ranges
        if words > word_key[i]:
            word_range = word_list[i]
        if chapters > chapter_key[i]:
            chapter_range = chapter_list[i]
            
    # Insert into the database
    insert_data2(database2, host, series, date)
    insert_data3(database3, host, series, date.year, rating, word_range, chapter_range)

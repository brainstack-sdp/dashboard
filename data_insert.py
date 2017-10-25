import requests
import json
import time
url = "https://restapi.surveygizmo.com/v4/survey/3405999/surveyresponse/?api_token=f8493ab1411c7e305c3d9ecfc10e81a4af305bbb910bced0da&api_token_secret=A9v1lpBfUEc4Y&filter[field][0]=status&filter[operator][0]==&filter[value][0]=Complete&page={page_number}"
from pymongo import MongoClient
client = MongoClient('34.230.165.196')
db = client.test

survey = db.survey_251017
for i in range(1,307):
    u = url.format(page_number=i)
    res = requests.get(u).json()
    print "Got response for page {}".format(i)
    for r in res['data']:
        try: 
            survey.insert(r)
        except Exception as exp:
            print exp
    print "Completed inserting page {}".format(i)
    # result = survey.insert_many(res['data'])

    # with open('data_test.json', 'r') as f:
        # res2 = json.load(f)
        # print(res2)
        # with open('data_test.json', 'w') as f2:  
            # f2.write(json.dumps(res['data'] + res2))
        # json.dump(res['data'], f, ensure_ascii=False)
    # exit()
    time.sleep(1)
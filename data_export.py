# import requests
import json
# import time
url = "https://restapi.surveygizmo.com/v4/survey/3405999/surveyresponse/?api_token=f8493ab1411c7e305c3d9ecfc10e81a4af305bbb910bced0da&api_token_secret=A9v1lpBfUEc4Y&filter[field][0]=status&filter[operator][0]==&filter[value][0]=Complete&page={page_number}"

# for i in range(1,307):
#     u = url.format(page_number=i)
#     res = requests.get(u).json()
#     print(res)
#     with open('data_test.json', 'r') as f:
#         res2 = json.load(f)
#         print(res2)
#         with open('data_test.json', 'w') as f2:  
#             f2.write(json.dumps(res['data'] + res2))
#         # json.dump(res['data'], f, ensure_ascii=False)
#     # exit()
#     time.sleep(5)
    
with open('data_test.json') as data_file:
    res = json.load(data_file)
    for js in res:
        with open('data_test1.json', 'a') as f:
            f.write(json.dumps(js))

# dicts = [{ "name": "Stephen", "Number": 1 }
#          ,{ "name": "Glinda", "Number": 2 }
#          ,{ "name": "Elphaba", "Number": 3 }
#          ,{ "name": "Nessa", "Number": 4 }]

# dicts2= [{ "name": "Dorothy", "Number": 5 }
#          ,{ "name": "Fiyero", "Number": 6 }]


# with open('data_test.json', 'r') as f:
#     res2 = json.load(f)
#     print(res2)
#     with open('data_test.json', 'w') as f2:  
#         f2.write(json.dumps(dicts + res2))

# f = open("data_test.json","w")
# f.write(json.dumps(dicts))
# f.close()

# f2 = open("data_test.json","r+")
# res = json.load(f2)

# print(res)
# # f2.seek(-1,2)
# f2.write(json.dumps(res+dicts2).replace('[',',',1))
# f2.close()

# f3 = open('test1.json','r')
# f3.read()
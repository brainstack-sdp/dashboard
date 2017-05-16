import pymysql.cursors
import pymysql

# Connect to the database
connection = pymysql.connect(host='education.cztr5jruorah.ap-south-1.rds.amazonaws.com',
                             user='admin',
                             password='education1234',
                             db='hpdata',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

try:
    with connection.cursor() as cursor:
    #     # Create a new record
        for i in range(1,14):
            print(i)
            sql = """INSERT INTO `student_result_competency` (`competency`, `question`, `student_id`, 
                `competency_category`, `type`,`success_criteria`,`success`, `in_final` ) 
            SELECT R.competency, S.q{0}, S.id, R.competency_category, R.type, R.success_criteria, 1, 0 
            from student S INNER JOIN result1 R on R.question=S.q{0} AND R.class_code=S.class_code 
            AND R.subject= S.subject where S.q{0} >= R.success_criteria """.format(str(i))
            print(sql)
            cursor.execute(sql)

            connection.commit()

            sql = """INSERT INTO `student_result_competency` (`competency`, `question`, `student_id`, 
                `competency_category`, `type`,`success_criteria`,`success`, `in_final` ) 
            SELECT R.competency, S.q{0}, S.id, R.competency_category, R.type, R.success_criteria, 0, 0
            from student S INNER JOIN result1 R on R.question=S.q{0} AND R.class_code=S.class_code 
            AND R.subject= S.subject where S.q{0} < R.success_criteria """.format(str(i))
            print(sql)
            cursor.execute(sql)
            connection.commit()
except Exception as e:
    print(e)
finally:
    connection.close()
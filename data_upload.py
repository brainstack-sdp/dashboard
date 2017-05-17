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
        for i in range(1,15):
            # sql = """INSERT INTO `student_result_competency_copy` (`competency`, `question`, `class_code`, 
            #     `student_id`, `competency_category`, `type`,`success_criteria`,`success`, `in_final` ) 
            # SELECT R.competency, {0}, S.class_code, S.id, R.competency_category, R.type,
            #  R.success_criteria, 1, 0 
            # from student S INNER JOIN result1 R on R.question={0} AND R.class_code=S.class_code 
            # AND R.subject= S.subject where S.q{0} >= R.success_criteria """.format(str(i))
            sql = """UPDATE `student_result_competency` SRC
                INNER JOIN student S on S.id = SRC.student_id 
                INNER JOIN competency_final R on R.class_code=S.class_code AND R.question = {0}
                AND R.competency = SRC.competency
                SET in_final=1 """.format(str(i))
            print(sql)

            cursor.execute(sql)
            connection.commit()

            # sql = """INSERT INTO `student_result_competency_copy` (`competency`, `question`, `class_code`, 
            #     `student_id`, `competency_category`, `type`,`success_criteria`,`success`, `in_final` ) 
            # SELECT R.competency, {0}, S.class_code, S.id, R.competency_category, R.type, 
            # R.success_criteria, 0, 0
            # from student S INNER JOIN result1 R on R.question={0} AND R.class_code=S.class_code 
            # AND R.subject= S.subject where S.q{0} < R.success_criteria """.format(str(i))

            sql = """UPDATE `student_result_competency` SRC
                INNER JOIN student S on S.id = SRC.student_id 
                INNER JOIN competency_final R on R.class_code=S.class_code AND R.question = {0}
                AND  R.competency = SRC.competency 
                SET in_final=1""".format(str(i))
            print(sql)
            cursor.execute(sql)
            connection.commit()
except Exception as e:
    print(e)
finally:
    connection.close()
import pymysql.cursors
import pymysql
import time
from datetime import datetime
start=datetime.now()
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
        for i in range(0,1670):
        # if True: 
            # sql = """INSERT INTO `student_result_competency_copy` (`competency`, `question`, `class_code`, 
            #     `student_id`, `competency_category`, `type`,`success_criteria`,`success`, `in_final` ) 
            # SELECT R.competency, {0}, S.class_code, S.id, R.competency_category, R.type,
            #  R.success_criteria, 1, 0 
            # from student S INNER JOIN result1 R on R.question={0} AND R.class_code=S.class_code 
            # AND R.subject= S.subject where S.q{0} >= R.success_criteria """.format(str(i))
            # sql = """UPDATE `student_result_competency` SRC
            #     INNER JOIN student S on S.id = SRC.student_id 
            #     INNER JOIN competency_final R on R.class_code=S.class_code AND R.question = {0}
            #     AND R.competency = SRC.competency
            #     SET in_final=1 """.format(str(i))
            # print(sql)
            sql = """SELECT S.school_code, SH.summer_winter, SH.school_name, 
                    SH.district, SH.cluster, SH.block, S.subject, S.id
                    FROM student S 
                    INNER JOIN school SH on SH.school_code=S.school_code 
                    LIMIT {0},1000 """.format(str(i*1000))
            print(sql)
            cursor.execute(sql)
            result = cursor.fetchall()
            print(result)
            for j in result:
                print(j)
     
                sql = """UPDATE `student_result_competency` SRC
                    SET SRC.school_code={1},
                    SRC.summer_winter='{2}', 
                    SRC.school_name='{3}', 
                    SRC.district='{4}', 
                    SRC.cluster='{5}', 
                    SRC.block='{6}',
                    SRC.subject='{7}' WHERE SRC.student_id = {0}""".format(str(j['id']), str(j['school_code']), 
                        j['summer_winter'], j['school_name'], j['district'], j['cluster'], j['block'], j['subject'])
                print(sql)
                cursor.execute(sql)
            # result = cursor.fetchone()
            # print(result)
            # print(datetime.now()-start)
            # start = datetime.now()

            connection.commit()

            # sql = """INSERT INTO `student_result_competency_copy` (`competency`, `question`, `class_code`, 
            #     `student_id`, `competency_category`, `type`,`success_criteria`,`success`, `in_final` ) 
            # SELECT R.competency, {0}, S.class_code, S.id, R.competency_category, R.type, 
            # R.success_criteria, 0, 0
            # from student S INNER JOIN result1 R on R.question={0} AND R.class_code=S.class_code 
            # AND R.subject= S.subject where S.q{0} < R.success_criteria """.format(str(i))

            # sql = """UPDATE `student_result_competency` SRC
            #     INNER JOIN student S on S.id = SRC.student_id 
            #     INNER JOIN competency_final R on R.class_code=S.class_code AND R.question = {0}
            #     AND  R.competency = SRC.competency 
            #     SET in_final=1""".format(str(i))
            # print(sql)
            sql = """ ALTER TABLE student_result_competency 
                ADD block VARCHAR(255) NULL,
                ADD INDEX (block), 
                ADD cluster VARCHAR(255) DEFAULT NULL,
                ADD INDEX (cluster), 
                ADD district VARCHAR(255) DEFAULT NULL,
                ADD INDEX (district), 
                ADD school_name VARCHAR(255) DEFAULT NULL,
                ADD INDEX (school_name), 
                ADD summer_winter VARCHAR(255) DEFAULT NULL,
                ADD INDEX (summer_winter), 
                ADD subject VARCHAR(255) NULL,
                ADD INDEX (subject),
                ADD INDEX (school_code)  """
            # print(sql)
            sql = """UPDATE `student_result_competency` SRC
                INNER JOIN student S on S.id = SRC.student_id 
                INNER JOIN result1 R on R.question={0} 
                AND R.class_code=S.class_code 
                AND R.success_criteria=0.5
                AND R.subject= S.subject 
                AND S.q{0} >= 0.5 
                SET success=1""".format(str(i))
            # print(sql)
            # cursor.execute(sql)
            # connection.commit()

            sql = """UPDATE `student_result_competency` SRC
                INNER JOIN student S on S.id = SRC.student_id 
                INNER JOIN result1 R on R.question={0} 
                AND R.class_code=S.class_code 
                AND R.success_criteria=0.5
                AND R.subject=S.subject 
                AND S.q{0} < 0.5 
                SET success=0""".format(str(i))
            # print(sql)
            # cursor.execute(sql)
            # connection.commit()
except Exception as e:
    print(e)
finally:
    connection.close()
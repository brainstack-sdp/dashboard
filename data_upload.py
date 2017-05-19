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
        # for i in range(1197,1200):
        # 1490
        # for i in range(931,1000):
        # for i in range(745,800):
        # for i in range(838,900):
        # for i in range(1600,1670):
        # for i in range(65,14):
        # for i in range(9047,18150):
        if False:
            sql = """DELETE from student_result_competency WHERE subject = 6 AND class_code in (6,7)"""
            print(sql)
            cursor.execute(sql) 
            connection.commit()
        if False:
            sql = """SELECT subject, competency, class_code, success_criteria, question, 
                        type, competency_category
                    from result1 
                    WHERE subject =6 
                    """
            print(sql)
            cursor.execute(sql)
            result = cursor.fetchall()
            for j in result:
                if j['competency'] in [6208, 6206, 7206, 7209, 7202]:
                    in_final = 1
                else:
                    in_final = 0

                if str(j['competency']) != '6201':
                    sql = """INSERT INTO `student_result_competency` 
                        (`competency`, `question`, `class_code`, 
                        `student_id`, `competency_category`, `type`,`success_criteria`,`success`, `in_final`, 
                        `school_code`, `block`, `cluster`, `district`, `school_name`,
                        `summer_winter`, `subject`) 
                        SELECT "{3}", "{0}", "{1}", S.id, "{5}", "{6}",
                         "{2}", 1, "{4}", S.school_code, SH.block, SH.cluster, SH.district, SH.school_name, 
                         SH.summer_winter, 6
                        from student S 
                        INNER JOIN school SH ON S.school_code = SH.school_code 
                        AND S.class_code = "{1}" AND S.subject = 6 
                        AND S.q{0} >= {2}
                        """.format(j['question'], 
                            j['class_code'], j['success_criteria'], j['competency'], in_final, 
                            j['competency_category'], j['type'])
                    print(sql)
                    cursor.execute(sql)
                    connection.commit()
                sql = """INSERT INTO `student_result_competency` 
                    (`competency`, `question`, `class_code`, 
                    `student_id`, `competency_category`, `type`,`success_criteria`,`success`, `in_final`, 
                    `school_code`, `block`, `cluster`, `district`, `school_name`,
                    `summer_winter`, `subject`)  
                    SELECT "{3}", "{0}", "{1}", S.id, "{5}", "{6}",
                     "{2}", 1, "{4}", S.school_code, SH.block, SH.cluster, SH.district, SH.school_name, 
                     SH.summer_winter, 6
                    from student S 
                    INNER JOIN school SH ON S.school_code = SH.school_code 
                    AND S.class_code = "{1}" AND S.subject=6 
                    AND S.q{0} < {2}
                    """.format(j['question'], 
                        j['class_code'], j['success_criteria'], j['competency'], in_final, 
                        j['competency_category'], j['type'])
                print(sql)
                cursor.execute(sql)
                connection.commit()
        if True:
            sql = """OPTIMIZE table student_result_competency_copy;"""
            cursor.execute(sql)
            connection.commit()
        if False:
            sql = """UPDATE `student_result_competency` SRC
                    SET subject=6
                    WHERE class_code IN (6,7) AND subject=3"""
            print(sql)
            cursor.execute(sql) 
            connection.commit()
            sql = """UPDATE `student` SRC
                    SET subject=6
                    WHERE class_code IN (6,7) AND subject=3"""
            print(sql)
            cursor.execute(sql) 
            connection.commit()
        if False:
            sql = """SELECT subject, competency, class_code, success_criteria, question, competency_category
                    from result1 
                    WHERE subject =6 
                    """
            print(sql)
            cursor.execute(sql)
            result = cursor.fetchall()
            for j in result:
                print(j)
                sql = """UPDATE `student_result_competency` SRC
                        SET success=0
                        WHERE SRC.class_code = {0} AND SRC.competency = {1} 
                        AND SRC.subject = {2} AND SRC.question={3} """.format(str(j['class_code']), 
                            j['competency'], j['subject'], j['question'])
                print(sql)
                cursor.execute(sql)
                connection.commit()
                sql = """SELECT id from student where class_code = {0} 
                    AND subject = {1} AND q{2} >= {3} 
                    """.format(str(j['class_code']), j['subject'], j['question'], j['success_criteria'])
                print(sql)
                cursor.execute(sql)
                result1 = cursor.fetchall()
                arr_str = ''
                if len(result)>0:
                    for k in result1:
                        arr_str += str(k['id']) 
                        arr_str += ", "
                    print(arr_str[:-2])
                    sql = """UPDATE `student_result_competency` SRC
                            SET success=1
                            WHERE SRC.student_id IN ({0}) 
                            AND subject={1} 
                            AND question={2} 
                            AND class_code={3}
                            AND competency={4}""".format(str(arr_str[:-2]), str(j['subject']), 
                                j['question'], j['class_code'], j['competency'])
                    print(sql)
                    cursor.execute(sql)
                    connection.commit()

        if False: 
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
            # sql = """SELECT S.school_code, SH.summer_winter, SH.school_name, 
            #         SH.district, SH.cluster, SH.block, S.subject, S.id
            #         FROM student S 
            #         INNER JOIN school SH on SH.school_code=S.school_code 
            #         LIMIT {0},1000 """.format(str(i*1000))
            # print(sql)
            # sql = """SELECT SH.school_code, SH.summer_winter, SH.school_name, 
            #         SH.district, SH.cluster, SH.block
            #         FROM school SH 
            #         WHERE district in ('SHIMLA') and block not in ('GAGRET-2', 'GAGRET-1', 'UNA', 
            #             'HAROLI', 'BAKRAS', 'DHARAMPUR', 'CHAUHARA', 'SADAR-1', 'SADAR-2', 
            #             'SUNDER NAGAR-1', 'SUNDER NAGAR-2', 'SAIGALOO', 'BALH', 'CHACHIOT-1', 
            #             'CHACHIOT-2', 'SERAJ-1','SERAJ-2', 'DRANG-1', 'DRANG-2','CHAUNTRA-1', 
            #             'CHAUNTRA-2', 'KARSOG-1', 'KARSOG-2', 'GOPALPUR-1', 'KUTHAR', 'KANDAGHAT', 
            #             'NALAGARH', 'DHUNDAN', 'BAKRAS', 'DADAHU', 'NAHAN', 'NOHRADHAR', 'PAONTA SAHIB', 
            #             'RAJGARH', 'SARAHAN', 'SATAUN', 'SHILLAI', 'SURLA', 'KAFFOTTA', 'NARAG', 'HAROLI',
            #             'UNA', 'GAGRET-1', 'GAGRET-2', 'AMB')
            #         """
            sql = """ SELECT subject, competency, class_code 
                    from result1"""; 
            cursor.execute(sql)
            result = cursor.fetchall()
            for j in result:
                sql = """UPDATE `student_result_competency` SRC
                        SET SRC.subject="{2}"
                        WHERE SRC.class_code = {0} AND SRC.competency = {1} 
                        AND SRC.subject IS NULL""".format(str(j['class_code']), 
                            j['competency'], j['subject'])
                print(sql)
                cursor.execute(sql)
            connection.commit()
            # for j in result:

            #     sql = """SELECT S.id
            #             FROM student S WHERE S.school_code = {0}
            #             """.format(str(j['school_code']))
            #     print(sql)
            #     print("\n\n\n\n\n\n\n\n\n\n\n\n\n")
            #     cursor.execute(sql)
            #     result1 = cursor.fetchall()
            #     print(result1)
            #     arr_str = ''
            #     if len(result)>0:
            #         for k in result1:
            #             arr_str += str(k['id']) 
            #             arr_str += ", "
            #         print(arr_str[:-2])
            #         sql = """UPDATE `student_result_competency` SRC
            #             SET SRC.school_code={1},
            #             SRC.summer_winter="{2}", 
            #             SRC.school_name="{3}", 
            #             SRC.district="{4}", 
            #             SRC.cluster="{5}", 
            #             SRC.block="{6}"
            #             WHERE SRC.student_id IN ({0})""".format(str(arr_str[:-2]), str(j['school_code']), 
            #                 j['summer_winter'], j['school_name'], j['district'], j['cluster'], j['block'])
            #         print(sql)
            #         cursor.execute(sql)
            #     connection.commit()
            # # print(result)
            # for j in result:
            #     print(j)
                # sql = """UPDATE `student_result_competency` SRC
                #     SET SRC.school_code={1},
                #     SRC.summer_winter='{2}', 
                #     SRC.school_name='{3}', 
                #     SRC.district='{4}', 
                #     SRC.cluster='{5}', 
                #     SRC.block='{6}',
                #     WHERE SRC.student_id = {0}""".format(str(j['id']), str(j['school_code']), 
                #         j['summer_winter'], j['school_name'], j['district'], j['cluster'], j['block'])
                # print(sql)
                # cursor.execute(sql)
            # result = cursor.fetchone()
            # print(result)
            # print(datetime.now()-start)
            # start = datetime.now()

            # connection.commit()

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
            # sql = """ ALTER TABLE student_result_competency 
            #     ADD block VARCHAR(255) NULL,
            #     ADD INDEX (block), 
            #     ADD cluster VARCHAR(255) DEFAULT NULL,
            #     ADD INDEX (cluster), 
            #     ADD district VARCHAR(255) DEFAULT NULL,
            #     ADD INDEX (district), 
            #     ADD school_name VARCHAR(255) DEFAULT NULL,
            #     ADD INDEX (school_name), 
            #     ADD summer_winter VARCHAR(255) DEFAULT NULL,
            #     ADD INDEX (summer_winter), 
            #     ADD subject VARCHAR(255) NULL,
            #     ADD INDEX (subject),
            #     ADD INDEX (school_code)  """
            # print(sql)
            # sql = """UPDATE `student_result_competency` SRC
            #     INNER JOIN student S on S.id = SRC.student_id 
            #     INNER JOIN result1 R on R.question={0} 
            #     AND SRC.question = {0}
            #     AND R.class_code=S.class_code 
            #     AND R.success_criteria=0.5
            #     AND R.subject= S.subject 
            #     AND S.q{0} >= 0.5 
            #     SET success=1""".format(str(i))
            # print(sql)
            # cursor.execute(sql)
            # connection.commit()

            # sql = """UPDATE `student_result_competency` SRC
            #     INNER JOIN student S on S.id = SRC.student_id 
            #     INNER JOIN result1 R on R.question={0} 
            #     AND SRC.question = {0}
            #     AND R.class_code=S.class_code 
            #     AND R.success_criteria=0.5
            #     AND R.subject=S.subject 
            #     AND S.q{0} < 0.5 
            #     SET success=0""".format(str(i))
            # print(sql)
            # cursor.execute(sql)
            # connection.commit()
        print("done")
except Exception as e:
    print(e)
finally:
    connection.close()
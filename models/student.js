/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define("student", {
    id: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    class_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    q1: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    q2: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    q3: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    q4: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    q5: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    q6: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    q7: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    q8: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    q9: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    q10: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    q11: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    q12: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    q13: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    roll_no: {
      type: DataTypes.STRING,
      allowNull: true
    },
    section_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sa1marks: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    sa2marks: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    sheet_id: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    sheet_id2: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    student_id: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    student_id2: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: true
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    max_marks: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    percentage: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    sum: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    u_dise: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "school_info",
        key: "school_code"
      }
    },
  }, {
    tableName: "student",
    classMethods: {
      associate: function (models) {
        models.student.belongsTo(models.school_info, {foreignKey: "u_dise", targetKey: "school_code", as: "SI"});
        models.student.hasMany(models.student_competency, {foreignKey: "student_id", sourceKey: "id", as: "SC"});
      }
    }
  });
};

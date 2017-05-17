/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define("student_competency", {
    id: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    competency: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "competency",
        key: "competency"
      }
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    success_criteria: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    question: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    competency_category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    success: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    in_final: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    block: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cluster: {
      type: DataTypes.STRING,
      allowNull: true
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true
    },
    school_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    school_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    summer_winter: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: true
    },
    student_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "student",
        key: "id"
      }
    },
  }, {
    tableName: "student_result_competency",
    classMethods: {
      associate: function (models) {
        models.student_competency.belongsTo(models.student, {foreignKey: "student_id", targetKey: "id", as: "S"});
        models.student_competency.belongsTo(models.competency, {foreignKey: "competency", targetKey: "competency", as: "C"});
      }
    },
    timestamps: false
  });
};

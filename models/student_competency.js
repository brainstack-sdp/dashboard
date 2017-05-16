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
    student_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "student",
        key: "id"
      }
    },
  }, {
    tableName: "student_competency",
    classMethods: {
      associate: function (models) {
        models.student_competency.belongsTo(models.student, {foreignKey: "student_id", targetKey: "id", as: "S"});
        models.student_competency.belongsTo(models.competency, {foreignKey: "competency", targetKey: "competency", as: "C"});
      }
    },
    timestamps: false
  });
};

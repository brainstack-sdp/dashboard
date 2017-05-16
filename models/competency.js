/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define("competency", {
    id: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    competency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    competency_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: "competency",
    classMethods: {
      associate: function (models) {
        models.competency.hasMany(models.student_competency, {foreignKey: "competency", sourceKey: "competency", as:"SC"});
      }
    },
    timestamps: false
  });
};

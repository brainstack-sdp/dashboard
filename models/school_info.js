/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define("school_info", {
    id: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    block: {
      type: DataTypes.STRING,
      allowNull: false
    },
    class_1: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    class_2: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    class_3: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    class_4: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    class_5: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    class_6: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    class_7: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    class_8: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    class_9: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    class_10: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sch_cat: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sch_mgt: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    cluster: {
      type: DataTypes.STRING,
      allowNull: true
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true
    },
    school_category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    school_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    school_management: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    school_name: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    summer_winter: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
    // brand_id: {
    //   type: DataTypes.INTEGER(10),
    //   allowNull: false,
    //   references: {
    //     model: "brands",
    //     key: "id"
    //   }
    // },
  }, {
    tableName: "school_info",
    classMethods: {
      associate: function (models) {
        // models.student_info.hasMany(models.sub_orders, {foreignKey: "restaurant_id", as: "SO"});
        // models.student_info.belongsTo(models.brands, {foreignKey: "brand_id", as: "B"});
      }
    }
  });
};

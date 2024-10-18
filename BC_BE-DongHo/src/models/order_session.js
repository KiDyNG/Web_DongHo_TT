"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_Sessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Order_Sessions.belongsTo(models.User);
      // Order_Sessions.belongsToMany(models.Product, {
      //   through: "Order_Product",
      // });
      // Order_Sessions.hasMany(models.Order_Product, { foreignKey: "OrderId" });
      // Order_Sessions.hasMany(models.Rate, { foreignKey: "OrderId" });
    }
  }
  Order_Sessions.init(
    {
      payment: DataTypes.STRING,
      status: DataTypes.INTEGER,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      total: DataTypes.FLOAT,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order_Sessions",
    }
  );
  return Order_Sessions;
};

"use strict";

let fs = require("fs");
let path = require("path");
let Sequelize = require("sequelize");
let basename = path.basename(module.filename);
let env = process.env.NODE_ENV || "dev";
let db = {};

let sequelize = new Sequelize(process.env.SQL_DB_DATABASE, process.env.SQL_DB_USER, process.env.SQL_DB_PASSWORD, {
  host: process.env.SQL_DB_HOST,
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  timezone: "asia/calcutta",
  logging: console.log
});

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== basename);
  })
  .forEach(function (file) {
    if (file.slice(-3) !== ".js") return;
    let model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

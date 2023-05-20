const Sequelize = require("sequelize");

const config = require(__dirname + "/../config/db.json")["development"];
const db = {};
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//추가 테이블
db.Model = require("./chat")(sequelize, Sequelize);

//
///
module.exports = db;

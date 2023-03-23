const Sequelize = require("sequelize");
const sequelize = new Sequelize("node_test", "node_user", "330420",
    {
        dialect: "mssql",
        host: "localhost",
        port: "1433",
        pool: {
            max: 10,
            min: 0,
            idle: 10000,
            acquire: 100000
        }
    });

module.exports = sequelize;

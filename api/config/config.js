require('dotenv').config()
module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    timezone: '+09:00',
    dialectOptions: {
      typeCast: (field, next) => {
        if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
          return new Date(`${field.string()} Z`)
        }
        return next()
      },
    },
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '+09:00',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '+09:00',
  },
}

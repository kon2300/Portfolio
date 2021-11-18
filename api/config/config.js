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
    password: undefined,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '+09:00',
  },
  production: {
    username: process.env.PRODUCTION_USERNAME,
    password: process.env.PRODUCTION_PASSWORD,
    database: process.env.PRODUCTION_DATABASE,
    host: process.env.PRODUCTION_HOST,
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
}

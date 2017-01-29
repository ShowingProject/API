import Sequelize from 'sequelize'
import config from './config'

const sequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWD, {
  host: config.DB_HOST,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  define: {
    freezeTableName: true,
    timestamps: false,
  }
});

export default callback => {
  callback(sequelize);
}

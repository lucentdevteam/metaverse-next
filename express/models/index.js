const Sequelize = require("sequelize");
const CONFIG = require("../config")
const sequelize = new Sequelize(CONFIG.database.db, CONFIG.database.user, CONFIG.database.password, {
  host: CONFIG.database.host,
  dialect: CONFIG.database.dialect,
  logging: CONFIG.database.logging == 'true',
  // dialectOptions: {
  //   useUTC: true,
  // },
  timezone: "+00:00",
  pool: {
    max: CONFIG.database.pool.max,
    min: CONFIG.database.pool.min,
    acquire: CONFIG.database.pool.acquire,
    idle: CONFIG.database.pool.idle
  }
});

const db = { sequelize: sequelize };

db.UserDetails = require("./user_details-model")(sequelize);
db.TalentDetails = require("./talent_details-model")(sequelize);

db.TalentDetails.belongsTo(db.UserDetails, { foreignKey: 'user_id', sourceKey: 'id' })

module.exports = db;
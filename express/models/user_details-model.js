const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define("user_detail", {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: Sequelize.STRING(50)
    },
    last_name: {
      type: Sequelize.STRING(50)
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    country: {
      type: Sequelize.STRING(50)
    },
    user_type: {
      type: Sequelize.STRING(50)
    }
  }
  );
}
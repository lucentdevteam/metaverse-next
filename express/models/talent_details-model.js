const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define("talent_detail", {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user_details',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    talent_type: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    virtual_worlds: {
      type: Sequelize.STRING(255)
    },
    experience: {
      type: Sequelize.STRING(100)
    },
    familiar_with: {
      type: Sequelize.STRING(50)
    }
  }
  );
}
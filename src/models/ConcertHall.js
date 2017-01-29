import Sequelize from 'sequelize'

export default (sequelize) =>
  sequelize.define('ConcertHall', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },

    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    picture_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    lat: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },

    lng: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },

    website_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    created_at: {
      type: Sequelize.DATE,
      alloweNull: false,
      defaultValue: Sequelize.NOW,
    },

    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  })
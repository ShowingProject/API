import Sequelize from 'sequelize'
//
// CREATE TABLE `Concert` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `name` varchar(255) NOT NULL,
//   `content` text,
//   `created_at` datetime DEFAULT NULL,
//   `updated_at` datetime DEFAULT NULL,
//   `concert_hall_id` int(11) NOT NULL,
//   `concert_date` datetime NOT NULL,
//   PRIMARY KEY (`id`),
//   UNIQUE KEY `id_UNIQUE` (`id`),
//   KEY `fk_Concert_ConcertHall_idx` (`concert_hall_id`),
//   CONSTRAINT `fk_Concert_ConcertHall` FOREIGN KEY (`concert_hall_id`) REFERENCES `ConcertHall` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
// ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


export default (sequelize) =>
  sequelize.define('Concert', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    concert_hall_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    concert_date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },

    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },

    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  })
const Sequelize = require('sequelize');
const db = require('../db');

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.DECIMAL(2, 2),
  },
});

module.exports = Item;

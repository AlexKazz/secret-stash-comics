const Sequelize = require("sequelize");
const db = require("../db");

const Item = db.define("item", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://i.annihil.us/u/prod/marvel/i/mg/e/80/62dab23aaca94/portrait_uncanny.jpg",
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
  },
});

module.exports = Item;

//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Item = require('./models/Item');
const Order = require('./models/Order')
const Cart = require('./models/Cart')

//associations could go here!
Order.belongsTo(User);
User.hasMany(Order);
Item.belongsToMany(Order, { through: Cart });
Order.belongsToMany(Item, { through: Cart });


module.exports = {
  db,

  models: {
    User,
    Item,
    Order,
    Cart
  },
};

const router = require("express").Router();

const {
  models: { User, Item, Order, Cart },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {include: [{model: Order, include: [Item]}]})
    res.send(user.orders[0]);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {include: [{model: Order, include: [Item]}]})
    let order = {};
    if (user.orders.length) {
      order = user.orders[0];
    } else {
      order = await Order.create({ userId: user.id });
    }
    async function increment(order, itemId, quantity){
      const itemList = await order.getItems();
      const itemInOrder = itemList.filter(
        (item) => item.id === itemId
      ).length;

      const cart = await Cart.findAll({
        where: {
          orderId: order.id,
          itemId: itemId,
        },
      });
      if(quantity === 0){
        await order.removeItem(itemId);
      } else {
        let newQty = itemInOrder ? cart[0].quantity + quantity : quantity;
        await order.addItem(itemId, { through: { quantity: newQty } });
      }
    } 
    await increment(order, req.body.item.id, req.body.quantityChange)
    const updatedOrder = await Order.findByPk(order.dataValues.id, {
      include: [Item],
    });

    res.send(updatedOrder);
  } catch (err) {
    next(err);
  }
});
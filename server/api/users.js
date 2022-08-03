const router = require("express").Router();

const {
  models: { User, Item, Order },
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

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(200, user);
  } catch (err) {
    next(err);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.params.id, {
      include: [
        {
          model: Order,
          where: {
            type: "active",
          },
          required: false,
          include: [Item],
        },
      ],
    });
    let currentOrder = {};

    if (currentUser.orders.length) {
      currentOrder = currentUser.orders[0];
    } else {
      currentOrder = await Order.create({ userId: currentUser.id });
    }
    await currentOrder.incrementProduct(
      req.body.product.id,
      req.body.quantityChange
    );
    const updatedOrder = await Order.findByPk(currentOrder.dataValues.id, {
      include: [Item],
    });

    res.send(updatedOrder);
  } catch (e) {
    console.log(e);
  }
});

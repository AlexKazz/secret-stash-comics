// const router = require("express").Router();
// const { Order, Item } = require("../db");

// router.delete("/:id", async (req, res, next) => {
//   try {
//     if (req.user) {
//       const order = await Order.findOne({
//         where: {
//           userId: req.user.id,
//           bought: false,
//         },
//       });
//       if (order) {
//         const item = await Item.findOne({
//           where: {
//             id: req.params.id,
//           },
//         });
//         await order.removeItem(item);
//         res.json(order);
//       } else {
//         res.sendStatus(404);
//       }
//     }
//   } catch (error) {
//     next(error);
//   }
// });

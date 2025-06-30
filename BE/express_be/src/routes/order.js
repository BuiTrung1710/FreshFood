const express = require("express");
const { categoryService } = require("../services/shippingOrderService");
//const { ShippingOrder } = require("../services/shippingOrderService");
const { orderService, Order } = require("../services/orderService");
const connection = require("../databases/mysql");
const router = express.Router();

// router.get("/:id", async (req, res) => {
//   const orderId = req.params.id;
//   const shippingOrderDetail = await orderService.getOrderDetail({
//     orderId,
//   });

//   if (shippingOrderDetail?.order_id) {
//     res.send({
//       data: shippingOrderDetail,
//     });
//   } else {
//     res.status(404).send({ message: "Order not found" });
//     return;
//   }
// });
router.get("/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    let isExisted = await orderService.checkOrderIdExists(orderId);

    if (!isExisted) {
      res.status(404).send({ message: "Order not found" });
      return;
    }
    orderService
      .getOrderDetail(orderId)
      .then((result) => {
        res.send({ data: result });
      })
      .catch((err) => {
        throw Error;
      });
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "Something went wrong" });
  }
  //console.log(orderId);
  // try {
  //   const orderDetail = await orderService.getOrderDetail(orderId);
  //   if (orderDetail?.order_id) {
  //     res.send({ data: orderDetail });
  //   } else {
  //     res.status(404).send({ message: "Không tìm thấy đơn hàng" });
  //   }
  // } catch (error) {
  //   res.status(500).send({ message: "Lỗi máy chủ" });
  // }
});



// router.get("/", async (req, res) => {
//   let { branchId } = req.query;
//   const orders = await orderService.getOrders({
//     branchId,
//   });

//   res.send({
//     data: orders,
//   });
// });
router.get("/", (req, res, next) => {
  let { page, limit, search, accountId } = req.query;
  orderService.getOrders(
    { page, limit, search, accountId },
    async (err, result) => {
      if (err) {
        next(err);
      } else {
        res.send({
          data: result,
          metadata: {
            total: await orderService.getTotalOrder(search, accountId),
            page,
            limit,
          },
        });
      }
    }
  );
});

router.post("/", async (req, res, next) => {
  try {
    const {
      customer_fullname,
      shipping_address,
      customer_phone,
      customer_email,
      payment_method,
      items,
    } = req.body;
    if (
      !(
        customer_fullname &&
        shipping_address &&
        customer_phone &&
        customer_email &&
        payment_method &&
        items
      )
    ) {
      res.status(400).json({
        message: "Not enough required informations",
      });
      return;
    }

    if (!Array.isArray(items)) {
      return res.status(400).json({
        message: 'Invalid request format. "items" should be an array.',
      });
    }

    const order = new Order(req.body);
    let orderId = await orderService
      .createOrder(order)
      .then((res) => {
        return res.insertId;
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Error" });
      });

    items.map(async (item) => {
      const [existingRows] = await new Promise((resolve, reject) =>
        connection.query(
          "SELECT * FROM Product WHERE ProductId = ?",
          [item.productId],
          (error, results) => {
            if (error) {
              return reject(error);
            }
            return resolve(results);
          }
        )
      );
      // Kiểm tra số lượng tồn kho
      if (existingRows.stock_quantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for product with ID ${item.productId}.`,
        });
      }

      // Cập nhật số lượng tồn kho
      const newStockQuantity = existingRows.stock_quantity - item.quantity;
      await new Promise((resolve, reject) =>
        connection.query(
          "UPDATE Product SET stock_quantity = ? WHERE ProductId = ?",
          [newStockQuantity, item.productId],
          (error, results) => {
            if (error) {
              return reject(error);
            }
            return resolve(results);
          }
        )
      );
      if (existingRows?.ProductId) {
        connection.query(
          "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
          [orderId, item.productId, item.quantity]
        );
      }
    });
    res.json({ message: "Succesfull" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res, next) => {
  const orderId = req.params.id;
  try {
    let isExisted = await orderService.checkOrderIdExists(orderId);

    if (!isExisted) {
      res.status(404).send({ message: "Order not found" });
      return;
    }
    //const { payment_status, order_status } = req.body;
    const {order_status } = req.body;
    orderService.updateOrder(
      orderId,
      //{ payment_status, order_status },
      {order_status},
      (err, result) => {
        if (err) {
          next(err);
        } else {
          res.send({ message: "Edit order status successful" });
        }
      }
    );
  } catch (error) {}
});

// router.put("cancel/:id", async (req, res) => {
//   const orderId = req.params.id;
//   try {
//     // Kiểm tra xem orderId có tồn tại không
//     let isExisted = await orderService.checkOrderIdExists(orderId);
//     if (!isExisted) {
//       res.status(404).send({ message: "Order not found" });
//       return;
//     }

//     // Cập nhật trạng thái hủy của đơn hàng
//     await orderService.cancelOrder(orderId);
//     res.send({ message: "Order cancelled successfully" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// });


// Delete a product category by ID
router.delete("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    let isExisted = await orderService.checkOrderIdExists(orderId);
    if (!isExisted) {
      res.status(404).send({ message: "Order not found" });
      return;
    }

    await new Promise((resolve, reject) =>
      connection.query(
        `DELETE FROM order_items WHERE order_id = ${orderId}`,
        (error, results) => {
          if (error) {
            res.status(500).send({ message: "Error" });
            console.log(error);
            return reject(error);
          }
          return resolve(results);
        }
      )
    );
    await orderService
      .deleteOrder(orderId)
      .then((response) => {
        res.send({ message: "Delete succesful" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Error" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;

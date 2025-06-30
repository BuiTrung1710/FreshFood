const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe("sk_test_51P1Pfn2NXqVGHAo7gBvF6mt0voOqDPuFf80dKtQqokQ6opcUWQ1xXtvbtEi2otmH5rlqPYQWFfknOBr32RdoQLCP00RyFk5hV1");
const { Order, orderService } = require("../services/orderService");
const connection = require("../databases/mysql");
require("dotenv").config();

router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      accountId: req.body.accountId,
      // Lưu trữ dưới dạng chuỗi JSON nhưng chỉ lấy những thông tin thiết yếu
      cart: JSON.stringify(
        req.body.cartItems.map((item) => ({
          productId: item.productId,
          name: item.productName,
          quantity: item.quantity,
          price: item.productPrice,
          //imagePath: `http://localhost:8080${item.productImage}`,
        }))
      ),
    },
  });
   const line_items = req.body.cartItems.map((item) => {
     return {
       price_data: {
         currency: "USD",
         product_data: {
           name: item.productName,
           metadata: {
             ProductId: item.productId,
             //imagePath: `http://localhost:8080/${item.productImage}`
           },
         },

         unit_amount: Math.round(item.productPrice * 100),
       },
       quantity: item.quantity,
     };
   });
   console.log(line_items)
   
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: line_items,
    mode: "payment",
    customer: customer.id,
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.CORS_URLS}/checkout-success`,
    cancel_url: `${process.env.CORS_URLS}/cart`,
  });
  res.json({ url: session.url });
});


async function createOrder(customer, session, res) {
  const cartItems = JSON.parse(customer.metadata.cart);
  
  // Tạo đơn hàng mới
  let newOrder = new Order({
    customer_fullname: session.shipping_details.name,
    shipping_address: session.shipping_details.address.city,
    customer_phone: session.customer_details.phone,
    customer_email: session.customer_details.email,
    payment_method: "stripe", // Cố định là stripe vì đang sử dụng stripe để thanh toán
    payment_status: session.payment_status,
    accountId: customer.metadata.accountId,
    cartItems,
  });
  console.log(session.payment_status);

  try {
    let orderId = await orderService
      .createOrder(newOrder)
      .then((res) => {
        return res.insertId;
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Error" });
      });

    console.log(orderId);
    // Tạo chi tiết đơn hàng cho mỗi mặt hàng trong giỏ
    cartItems.map(async (item) => {
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
      return orderId; // Trả về orderId cho hàm gọi
    });
  } catch (err) {
    console.error("Failed to create order:", err);
    return null;
  }
}


// // Stripe webhoook
router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    let data;
    let eventType;

    // Check if webhook signing is configured.
    let webhookSecret;
    //webhookSecret = process.env.STRIPE_WEB_HOOK;

    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data.object;
      console.log(data);
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          const session = await stripe.checkout.sessions.retrieve(data.id); // Thêm dòng này để lấy chi tiết session
          createOrder(customer, session, res); // Chuyển session thay vì data
        })
        .catch((err) => console.log(err.message));
    }

    res.status(200).end();
    
  }
);

module.exports = router;
const connection = require("../databases/mysql");

var Order = function (order = {}) {
  let {
    customer_fullname,
    shipping_address,
    customer_phone,
    customer_email,
    payment_method,
    payment_status,
    accountId,
  } = order;
  this.customer_fullname = customer_fullname;
  this.shipping_address = shipping_address;
  this.customer_phone = customer_phone;
  (this.customer_email = customer_email),
    (this.payment_method = payment_method);
  this.payment_status = payment_status;
  this.accountId = accountId;
};

const orderService = {
  // getOrderDetail: async ({ orderId = undefined }) => {
  //   let orderDetail = await new Promise((resolve, reject) => {
  //     connection.query(
  //       `SELECT * from orders where order_id=${orderId}`,
  //       (error, results) => {
  //         if (error) {
  //           return reject(error);
  //         }
  //         return resolve(results[0]);
  //       }
  //     );
  //   });
  //   let orderItems = await new Promise((resolve, reject) => {
  //     connection.query(
  //       `
  //         SELECT p.ProductId, p.ProductName, p.ProductPrice, oi.quantity
  //         from order_items oi
  //         join Product p on p.ProductId = oi.product_id
  //         where oi.order_id=${orderId}
  //       `,
  //       (error, results) => {
  //         if (error) {
  //           return reject(error);
  //         }
  //         return resolve(results);
  //       }
  //     );
  //   });
  //   return { ...orderDetail, items: orderItems };
  // },

  // getOrderDetail: (orderId) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       `
  //       SSELECT
  //         O.order_id AS orderId,
  //         O.customer_fullname AS customerFullname,
  //         O.shipping_address AS shippingAddress,
  //         O.customer_phone AS customerPhone,
  //         O.customer_email AS customerEmail,
  //         O.payment_status AS paymentStatus,
  //         O.order_status AS orderStatus,
  //         O.payment_method AS paymentMethod,
  //         O.createTime,
  //         GROUP_CONCAT(D.product_id ORDER BY P.ProductName SEPARATOR ', ') AS productIds,
  //         GROUP_CONCAT(D.quantity ORDER BY P.ProductName SEPARATOR ', ') AS quantities,
  //         GROUP_CONCAT(P.ProductName ORDER BY P.ProductName SEPARATOR ', ') AS productNames,
  //         GROUP_CONCAT(P.ProductPrice ORDER BY P.ProductName SEPARATOR ', ') AS productPrices,
  //         GROUP_CONCAT(P.ProductImage ORDER BY P.ProductName SEPARATOR ', ') AS productImages
  //       FROM orders AS O
  //       LEFT JOIN order_items AS D ON O.order_id = D.order_id
  //       LEFT JOIN product AS P ON D.product_id = P.ProductId
  //       WHERE O.order_id = '${orderId}'
  //       GROUP BY O.order_id
  //       ORDER BY O.createTime DESC
  //       `,
  //       (error, results) => {
  //         if (error) {
  //           return reject(error);
  //         }
  //         return resolve(results); // Trả về tất cả kết quả, không chỉ một
  //       }
  //     );
  //   });
  // },
  getOrderDetail: (orderId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        SELECT
          O.order_id AS orderId, 
          O.customer_fullname AS customerFullname, 
          O.shipping_address AS shippingAddress,
          O.customer_phone AS customerPhone, 
          O.customer_email AS customerEmail, 
          O.payment_status AS paymentStatus, 
          O.order_status AS orderStatus, 
          O.payment_method AS paymentMethod, 
          O.createTime,
          GROUP_CONCAT(D.product_id ORDER BY P.ProductName SEPARATOR ', ') AS productIds,
          GROUP_CONCAT(D.quantity ORDER BY P.ProductName SEPARATOR ', ') AS quantities,
          GROUP_CONCAT(P.ProductName ORDER BY P.ProductName SEPARATOR ', ') AS productNames, 
          GROUP_CONCAT(P.ProductPrice ORDER BY P.ProductName SEPARATOR ', ') AS productPrices, 
          GROUP_CONCAT(P.ProductImage ORDER BY P.ProductName SEPARATOR ', ') AS productImages
        FROM orders AS O
        LEFT JOIN order_items AS D ON O.order_id = D.order_id
        LEFT JOIN product AS P ON D.product_id = P.ProductId
        WHERE O.order_id = '${orderId}'
        GROUP BY O.order_id
        ORDER BY O.createTime DESC
        `,
        (error, results) => {
          if (error) {
            return reject(error);
          }
          // Kết quả trả về sẽ bao gồm một bản ghi duy nhất với tất cả thông tin của sản phẩm được tổng hợp
          return resolve(results[0]); // chỉ trả về kết quả đầu tiên (một đơn hàng có thể có nhiều dòng)
        }
      );
    });
  },

  getTotalOrder: (search = "", accountId = null) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(order_id) as total FROM orders 
          where concat(customer_fullname) LIKE '%${search}%' ${
          accountId ? `AND AccountId = '${accountId}'` : ""
        }`,
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results[0]?.total);
        }
      );
    }),

  getOrders: ({ page, limit, search = "", accountId = null }, callback) => {
    connection.query(
      //     `
      //  SELECT
      //       O.order_id AS orderId, O.customer_fullname AS customerFullname, O.shipping_address AS shippingAddress,
      //       O.customer_phone AS customerPhone, O.customer_email AS customerEmail, O.payment_status AS paymentStatus, O.order_status AS orderStatus, O.payment_method AS paymentMethod, O.createTime,
      //       A.AccountId AS accountId,
      //       D.product_Id AS productId, D.quantity AS quantity,
      //       P.ProductName AS productName, P.ProductPrice AS productPrice, P.ProductImage AS productImage

      //     FROM orders AS O
      //       LEFT JOIN Account AS A ON O.AccountId = A.AccountId
      //       LEFT JOIN order_items AS D ON O.order_id = D.order_id
      //       LEFT JOIN product AS P ON D.product_id = P.ProductId

      //     WHERE O.customer_fullname OR P.ProductName LIKE '%${search}%' ${
      //       accountId ? `AND O.AccountId = ${accountId}` : ""
      //     }
      //     GROUP BY O.order_id, O.customer_fullname, O.shipping_address, O.customer_phone, O.customer_email, O.payment_status, O.order_status, O.payment_method, O.createTime, A.AccountId, D.product_Id, D.quantity, P.ProductName, P.ProductPrice
      //     ORDER BY O.createTime DESC
      //     ${page ? `limit ${(page - 1) * limit}, ${limit}` : ""}`,
      `SELECT
        O.order_id AS orderId, O.createTime, O.customer_fullname AS customerFullname, O.shipping_address AS shippingAddress, O.customer_phone AS customerPhone,
        O.customer_email AS customerEmail, O.payment_status AS paymentStatus, O.order_status AS orderStatus, O.payment_method AS paymentMethod,
        A.AccountId AS accountId,
        GROUP_CONCAT(P.ProductName ORDER BY P.ProductName SEPARATOR ', ') AS ProductNames,
        GROUP_CONCAT(D.quantity ORDER BY P.ProductName SEPARATOR ', ') AS Quantities,
        GROUP_CONCAT(P.ProductPrice ORDER BY P.ProductName SEPARATOR ', ') AS Prices,
        GROUP_CONCAT(P.ProductImage ORDER BY P.ProductName SEPARATOR ', ') AS Images
        FROM orders AS O
        LEFT JOIN Account AS A ON O.AccountId = A.AccountId
        LEFT JOIN order_items AS D ON O.order_id = D.order_id
        LEFT JOIN product AS P ON D.product_id = P.ProductId
        WHERE O.customer_fullname LIKE '%${search}%' ${
        accountId ? `AND O.AccountId = ${accountId}` : ""
      }
        GROUP BY O.order_id
        ORDER BY O.createTime DESC
         ${page ? `limit ${(page - 1) * limit}, ${limit}` : ""}
        `,
      callback
    );
  },
  createOrder: (newOrder) => {
    return new Promise((resolve, reject) =>
      connection.query(
        `INSERT INTO orders set ?`,
        {
          ...newOrder,
          order_status: "0",
          //payment_status: "0",
        },
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      )
    );
  },
  updateOrder: (id, updateOrder, callback) => {
    // connection.query(
    //   `UPDATE orders set order_status = ?, payment_status = ? WHERE order_id = ${id}`,
    //   [updateOrder.order_status, updateOrder.payment_status],
    //   callback
    // );
    connection.query(
      `UPDATE orders set order_status = ? WHERE order_id = ${id}`,
      [updateOrder.order_status],
      callback
    );
  },

  // cancelOrder: (id) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       `UPDATE orders SET order_status = 4 WHERE order_id = ${id}`,
  //       (error, results) => {
  //         if (error) {
  //           console.log(error);
  //           return reject(error);
  //         }
  //         return resolve(results);
  //       }
  //     );
  //   });
  // },

  deleteOrder: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM orders WHERE order_id = ${id}`,
        (error, results) => {
          if (error) {
            console.log(error);
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },
  checkOrderIdExists: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `
      SELECT EXISTS(select * from orders
      where order_id = '${id}') as isExisted
    `,
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(Boolean(results[0]?.isExisted));
        }
      );
    }),
};

module.exports = {
  orderService,
  Order,
};

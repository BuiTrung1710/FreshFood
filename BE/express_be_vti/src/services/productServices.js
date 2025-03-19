const connection = require("../databases/mysql");

var Product = function (product = {}) {
  if (product.productId) {
    this.ProductId = product.productId;
  }
  if (product.productName) {
    this.ProductName = product.productName;
  }
  if (product.productPrice) {
    this.ProductPrice = product.productPrice;
  }
  if (product.productInfo) {
    this.ProductInfo = product.productInfo;
  }
  if (product.productDetail) {
    this.ProductDetail = product.productDetail;
  }
  if (product.ratingStar) {
    this.RatingStar = product.ratingStar;
  }
  if (product.productImage) {
    this.ProductImage = product.productImage;
  }
  if (product.manufacturerId) {
    this.ManufacturerId = product.manufacturerId;
  }
  if (product.categoryId) {
    this.CategoryId = product.categoryId;
  }
  if (product.createDate) {
    this.createDate = product.createDate;
  }
  if (product.exp_date) {
    this.exp_date = product.exp_date;
  }
  if (product.stock_quantity){
    this.stock_quantity = product.stock_quantity;
  }
};

const productService = {
  getProducts: ({ page, limit, search = "", categoryId = null, sortedProduct = "" }, callback) => {
    // Xác định điều kiện sắp xếp
    let orderByClause = "";
    if (sortedProduct === "asc" || sortedProduct === "desc") {
      orderByClause = `ORDER BY productPrice ${sortedProduct}`;
    } else {
      // Nếu không có thông tin sắp xếp, hoặc muốn sắp xếp theo mặc định (ví dụ: theo ngày tạo)
      orderByClause = `ORDER BY CreateDate DESC`; // Hoặc sắp xếp theo bất kỳ trường mặc định nào khác
    }
    connection.query(
      `
      select 
        A.ProductId as productId, ProductName as productName, ProductPrice as productPrice, ProductInfo as productInfo, 
        ProductDetail as productDetail, ProductImage as productImage,
        A.CategoryId as categoryId, A.ManufacturerId as manufacturerId,
        C.CategoryName as categoryName, M.ManufacturerName as manufacturerName,
        COALESCE(AVG(R.rating), 0) AS ratingStar, A.exp_date, CreateDate as createDate, A.stock_quantity

      from Product as A
        left join Category as C on C.CategoryId = A.CategoryId
        left join Manufacturer as M on M.ManufacturerId = A.ManufacturerId
        LEFT JOIN Product_Review as R ON A.ProductId = R.ProductId

      GROUP BY A.ProductId
      HAVING concat(ProductName) LIKE '%${search}%' ${
        categoryId ? `AND A.CategoryId = ${categoryId}` : ""
      } 
      ${orderByClause}
      ${page ? `limit ${(page - 1) * limit}, ${limit} ` : ""} `,
      callback
    );
  },
  getProductDetail: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        select 
        ProductId as productId, ProductName as productName, ProductPrice as productPrice, ProductInfo as productInfo, 
        ProductDetail as productDetail, RatingStar as ratingStar, ProductImage as productImage,
        A.CategoryId as categoryId, A.ManufacturerId as manufacturerId,
        C.CategoryName as categoryName, M.ManufacturerName as manufacturerName, A.exp_date, CreateDate as createDate, A.stock_quantity
        from Product as A
        left join Category as C on C.CategoryId = A.CategoryId
        left join Manufacturer as M on M.ManufacturerId = A.ManufacturerId
        where A.ProductId = '${id}'
        `,
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results[0]);
        }
      );
    });
  },
  getTotalProduct: (search = "", categoryId = null) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(ProductId) as total FROM Product 
          where concat(ProductName) LIKE '%${search}%' ${
          categoryId ? `AND CategoryId = '${categoryId}'` : ""
        }`,
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results[0]?.total);
        }
      );
    }),
  getProductCountByCategory: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT CategoryId, COUNT(CategoryId) AS count FROM Product GROUP BY CategoryId`,
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },

  checkProductNameExists: (name) =>
    new Promise((resolve, reject) => {
      connection.query(
        `
        SELECT EXISTS(select * from Product
        where ProductName = '${name}') as isExisted
      `,
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(Boolean(results[0]?.isExisted));
        }
      );
    }),
  checkProductIDExists: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `
        SELECT EXISTS(select * from Product
        where ProductId = '${id}') as isExisted
      `,
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(Boolean(results[0]?.isExisted));
        }
      );
    }),
  createProduct: (newProduct, callback) => {
    connection.query(`INSERT INTO Product set ?`, newProduct, callback);
  },
  updateProduct: (id, updateProduct, callback) => {
    connection.query(
      `UPDATE Product set ? WHERE ProductId = ${id}`,
      updateProduct,
      callback
    );
  },
  deleteProduct: (id, callback) => {
    connection.query(`DELETE FROM Product WHERE ProductId = ${id}`, callback);
  },
};

module.exports = {
  Product,
  productService,
};

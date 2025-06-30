const express = require("express");
const {
  productReviewService,
  ProductReview,
} = require("../services/productReviewService");
const { authorization } = require("../utils/auth");
const router = express.Router();

router.post("/", authorization, async (req, res) => {
  try {
    let { productId, rating, recommend } = req.body;
    if (!productId || !rating || !recommend) {
      return res
        .status(400)
        .send({ message: "ProductId and rating are required" });
    }
    if (!req?.userId) {
      throw Error("User ID is required");
    }
    
    if (recommend === undefined || recommend === null) {
      recommend = ""; // Chuyển giá trị null hoặc undefined thành chuỗi rỗng
    }

    let newReview = new ProductReview({
      productId,
      rating,
      accountId: `${req?.userId}`,
      recommend,
    });
    productReviewService
      .createReview(newReview)
      .then((result) => {
        res.send({
          data: "Successful",
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
      });
  } catch (error) {
    console.error(error);
    res.status(403).send({ message: "Forbidden" });
  }
});

router.get("/review/:id", async (req, res) => {
  try {
    const productId = req.params.id; // Sửa lại đây để lấy id từ params
    // Lấy thông tin đánh giá từ cơ sở dữ liệu dựa trên productId
    const reviews = await productReviewService.getProductReviewById(productId);
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;


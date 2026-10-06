const cartModel = require("../../models/cartModel");
const jwt = require("jsonwebtoken"); //  import jwt

let cartController = {
  addToCart: async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ status: 0, message: "Please login first!" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKENKEY);
      
      let cartobj = { ...req.body };
      cartobj["userId"] = decoded.id;

      let cartRes = await cartModel.create(cartobj);

      return res.status(200).json({
        status: 1,
        message: "Data Added to Cart",
        data: cartRes,
      });
    } catch (err) {
      return res.status(400).json({
        status: 0,
        message: err.message || "Failed to add to cart",
      });
    }
  },
};

module.exports = cartController;
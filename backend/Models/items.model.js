var mongoose = require("mongoose");
var orderModel = new mongoose.model("items", {
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  orders: { type: mongoose.Schema.Types.ObjectId, ref: "orders" },
});
module.exports = orderModel;

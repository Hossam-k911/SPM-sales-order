var mongoose = require("mongoose");

function dbConnect() {
  mongoose.connect("mongodb://localhost:27017/sales-order");
}

module.exports = dbConnect;

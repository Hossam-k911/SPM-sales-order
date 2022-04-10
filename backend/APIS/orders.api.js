var mongoose = require("mongoose");
var itemsModel = require("../Models/items.model.js");
var ordersModel = require("../Models/order.model.js");

function ordersAPIS(app) {
  app.post("/addorder", async (req, resp) => {
    try {
      const { number, customer_name } = req.body;
      let order = new ordersModel({
        _id: mongoose.Types.ObjectId(),
        number: number,
        customer_name: customer_name,
      });
      await order.save();
      resp.json({ status: 200, result: order });
    } catch (err) {
      resp.json({ status: 400, message: "error is  adding new order " });
    }
  });

  app.get("/orders", async (req, resp) => {
    try {
      let orders = await ordersModel.find({});
      resp.json({ orders });
    } catch (err) {
      resp.json({ status: 400, message: "error in fetching orders " });
    }
  });
  app.get(`/getorderbyid/:o_id`, async (req, resp) => {
    try {
      const { o_id } = req.params;
      let order = await ordersModel.findOne({ _id: o_id });
      //  .select(" employees_number");
      resp.json({ order });
    } catch (err) {
      resp.json({
        status: 400,
        message: "error in fetching order by ID ",
      });
    }
  });

  app.put(`/updateorder/:o_id`, async (req, resp) => {
    try {
      const { o_id } = req.params;
      const { number, customer_name } = req.body;
      let order = await ordersModel.findOneAndUpdate(
        { _id: o_id },
        { number: number, customer_name: customer_name },
        { returnOriginal: false }
      );
      resp.json({ status: 200, result: order });
    } catch (err) {
      resp.json({
        status: 400,
        message: "error in editing order by ID ",
      });
    }
  });
  app.post("/removeorder", async (req, resp) => {
    try {
      const { o_id } = req.body;
      await ordersModel.findOneAndRemove({ _id: o_id });
      resp.json("success");
    } catch (err) {
      resp.json("err");
    }
  });
}

module.exports = ordersAPIS;

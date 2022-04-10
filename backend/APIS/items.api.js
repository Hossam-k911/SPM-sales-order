var mongoose = require("mongoose");
var itemsModel = require("../Models/items.model");
var ordersModel = require("../Models/order.model");

function itemsAPI(app) {
  app.post("/additem", async (req, resp) => {
    try {
      const { name, price } = req.body;
      let item = new itemsModel({
        _id: mongoose.Types.ObjectId(),
        name: name,
        price: price,
      });
      await item.save();
      resp.json({ status: 200, result: item });
    } catch (err) {
      resp.json({ status: 400, message: "error is  adding new item " });
    }
  });

  app.get("/items", async (req, resp) => {
    try {
      let items = await itemsModel.find({});
      resp.json({ items });
    } catch (err) {
      resp.json({ status: 400, message: "error in fetching items " });
    }
  });

  app.get(`/getitembyid/:i_id`, async (req, resp) => {
    try {
      const { i_id } = req.params;
      let item = await itemsModel.findOne({ _id: i_id });
      resp.json({ status: 200, result: item });
    } catch (err) {
      resp.json({
        status: 400,
        message: "error in fetching item by ID ",
      });
    }
  });

  app.put(`/updateitem/:i_id`, async (req, resp) => {
    try {
      const { i_id } = req.params;
      const { name, price } = req.body;
      let item = await itemsModel.findOneAndUpdate(
        { _id: i_id },
        { name: name, price: price },
        { returnOriginal: false }
      );
      resp.json({ status: 200, result: item });
    } catch (err) {
      resp.json({
        status: 400,
        message: "error in editing order by ID ",
      });
    }
  });
  app.post("/removeitem", async (req, resp) => {
    try {
      const { i_id } = req.body;
      await ordersModel.findOneAndRemove({ _id: i_id });
      resp.json("success");
    } catch (err) {
      resp.json("err");
    }
  });
  app.post("/additemtoorder", async (req, resp) => {
    try {
      const { o_id, i_id } = req.body;
      let selectedOrder = await ordersModel.findOne({ _id: o_id });
      if (selectedOrder) {
        selectedOrder.items.push(i_id);
        await selectedOrder.save();
      }
      await selectedOrder.save;
      resp.json({ status: 200, result: selectedOrder });
    } catch (err) {
      resp.json({
        status: 400,
        message: "error in adding item into order  ",
      });
    }
  });
}

module.exports = itemsAPI;

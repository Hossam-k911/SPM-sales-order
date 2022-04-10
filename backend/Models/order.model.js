var mongoose = require('mongoose')
var orderModel = new mongoose.model('orders',{
    _id:mongoose.Schema.Types.ObjectId,
    number:Number,
    customer_name:String,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "items" }]
});
module.exports = orderModel;
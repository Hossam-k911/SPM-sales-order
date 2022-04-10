module.exports = function (app) {
  require("./orders.api.js")(app);
  require("./items.api.js")(app);
};

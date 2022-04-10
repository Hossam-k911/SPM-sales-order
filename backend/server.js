var express = require("express");
var app = express();
var session = require("express-session");

var cookieParser = require("cookie-parser");
var cors = require("cors");
var dbConnect = require("./dbConnection");
var runAPIS = require("./APIS/index");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use(
  session({
    // genid: function () {
    //   return uuid;
    // },
    secret: "hossam",
    resave: false,
    cookie: { maxAge: 1000000000000 },
  })
);

dbConnect();
runAPIS(app);

app.get("/", (req, resp) => {
  resp.send("server is running");
});
app.listen(8085);

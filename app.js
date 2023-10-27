const express = require("express");

const app = express();
// gloabal middleware for routes
app.use(middleWare1);
app.use(middleWare2);
function errHandler(err, req, res, next) {
  if (err) {
    res.send(err.message);
  }
}
function middleWare1(req, res, next) {
  req.myName = "bilal";
  next();
}
function middleWare2(req, res, next) {
  console.log(req.myName);
  req.myName = "ggg";
  let manualError = new Error("Manual Errror to test ");
  next(manualError);
}
function expressCallabck(req, res, next) {
  res.send(req.myName);
}
function routeMiddleWare(req, res, next) {
  if (req.myName !== "ggg") {
    let manualError = new Error("Manual routeMiddleware Error to test ");
    next(manualError);
  }
  req.authentication = true;
  next();
}
// route specific middlewares
app.get("/", routeMiddleWare, expressCallabck);
app.use(errHandler);
app.listen(3000);

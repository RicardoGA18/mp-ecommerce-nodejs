"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

const paymentRouter = (0, _express.Router)();
paymentRouter.get('/success', (req, res) => {
  console.log(req.query);
  res.render('success', req.query);
});
paymentRouter.get('/failure', (req, res) => {
  res.render('failure', req.query);
});
paymentRouter.get('/pending', (req, res) => {
  res.render('pending', req.query);
});
paymentRouter.post('/notifications', (req, res) => {
  console.log('Getting notifications');
  console.log('By req.query');
  console.log(req.query);
  console.log('By req.body');
  console.log(req.body);
  console.log('In JSON form');
  console.log(JSON.stringify(req.body));
  res.status(200);
});
var _default = paymentRouter;
exports.default = _default;
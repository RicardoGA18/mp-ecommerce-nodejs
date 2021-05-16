"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _mercadopago = _interopRequireDefault(require("mercadopago"));

var _preference = _interopRequireDefault(require("../libs/preference"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const frontRouter = (0, _express.Router)();
frontRouter.get('/', (req, res) => {
  res.render('home');
});
frontRouter.get('/detail', async (req, res) => {
  /* Creating the preference */
  const {
    img,
    title,
    price,
    unit
  } = req.query;
  const item = {
    id: 1234,
    title,
    description: 'Dispositivo móvil de Tienda e-commerce',
    picture_url: req.get('host') + img.substr(1),
    quantity: +unit,
    currency_id: 'PEN',
    unit_price: +price
  };
  _preference.default.items = [item];
  _preference.default.back_urls.failure = `${req.get("host")}/failure`;
  _preference.default.back_urls.success = `${req.get("host")}/success`;
  _preference.default.back_urls.pending = `${req.get("host")}/pending`;
  _preference.default.notification_url = `${req.get("host")}/notifications`;
  const response = await _mercadopago.default.preferences.create(_preference.default);
  req.query.init_point = response.body.init_point;
  res.render('detail', req.query);
});
var _default = frontRouter;
exports.default = _default;
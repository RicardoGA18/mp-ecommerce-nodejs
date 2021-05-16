"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _mercadopago = _interopRequireDefault(require("mercadopago"));

var _front = _interopRequireDefault(require("../routes/front.routes"));

var _payment = _interopRequireDefault(require("../routes/payment.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

class Server {
  constructor() {
    this.app = (0, _express.default)();
    this.port = process.env.PORT || 3000;

    _mercadopago.default.configure({
      access_token: process.env.ACCESS_TOKEN,
      integrator_id: process.env.INTEGRATOR_ID
    });

    this.middlewares();
    this.handlebars();
    this.routes();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  middlewares() {
    this.app.use(_express.default.json());
    this.app.use('/assets', _express.default.static(__dirname + '/../assets'));
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origins", "*");
      res.header("Access-Control-Allow-Headers", "Authorization, Content-Type, Access-Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      next();
    });
  }

  handlebars() {
    this.app.engine('handlebars', (0, _expressHandlebars.default)());
    this.app.set('view engine', 'handlebars');
  }

  routes() {
    this.app.use(_front.default);
    this.app.use(_payment.default);
  }

}

exports.default = Server;
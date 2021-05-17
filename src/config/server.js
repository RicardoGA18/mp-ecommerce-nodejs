import express from 'express'
import exphbs from 'express-handlebars'
import mercadopago from 'mercadopago'
import frontRouter from '../routes/front.routes'
import paymentRouter from '../routes/payment.routes'
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

export default class Server{
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    mercadopago.configure({
      access_token: process.env.ACCESS_TOKEN,
      integrator_id: process.env.INTEGRATOR_ID,
    })
    this.middlewares()
    this.handlebars()
    this.routes()
  }
  start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
  middlewares() {
    this.app.use(express.json())
    this.app.use('/assets',express.static(__dirname + '/../../assets'))
    this.app.use((req,res,next) => {
      res.header("Access-Control-Allow-Origins", "*")
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Content-Type, Access-Content-Type, Accept"
      )
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
      next()
    })
  }
  handlebars(){
    this.app.engine('handlebars',exphbs())
    this.app.set('view engine','handlebars')
  }
  routes(){
    this.app.use(frontRouter)
    this.app.use(paymentRouter)
  }
}
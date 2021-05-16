import { Router } from 'express'
import mercadopago from 'mercadopago'
import preference from '../libs/preference'

const frontRouter = Router()

frontRouter.get('/', (req,res) => {
  res.render('home')
})

frontRouter.get('/detail', async (req,res) => {
  /* Creating the preference */
  const { img , title , price , unit } = req.query
  const item = {
    id: 1234,
    title,
    description: 'Dispositivo móvil de Tienda e-commerce',
    picture_url: req.get('host') + img.substr(1),
    quantity: +unit,
    currency_id: 'PEN',
    unit_price: +price,
  }
  preference.items = [item]
  preference.back_urls.failure = `${req.get("host")}/failure`
  preference.back_urls.success = `${req.get("host")}/success`
  preference.back_urls.pending = `${req.get("host")}/pending`
  preference.notification_url = `${req.get("host")}/notifications`
  const response = await mercadopago.preferences.create(preference)
  req.query.init_point = response.body.init_point
  res.render('detail',req.query)
})

export default frontRouter
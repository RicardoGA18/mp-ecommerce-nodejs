import { Router } from 'express'

const paymentRouter = Router()

paymentRouter.get('/success',(req,res) => {
  console.log(req.query)
  res.render('success',req.query)
})

paymentRouter.get('/failure',(req,res) => {
  res.render('failure',req.query)
})

paymentRouter.get('/pending',(req,res) => {
  res.render('pending',req.query)
})

paymentRouter.post('/notifications',(req,res) => {
  console.log('Getting notifications')
  console.log('By req.query')
  console.log(req.query)
  console.log('By req.body')
  console.log(req.body)
  console.log('In JSON form')
  console.log(JSON.stringify(req.body))
  res.status(200)
})

export default paymentRouter
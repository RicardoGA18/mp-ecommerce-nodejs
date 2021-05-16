const payer = {
  name: 'Lalo',
  surname: 'Landa',
  email: 'test_user_46542185@testuser.com',
  phone: {
    number: 5549737300,
    area_code: '52',
  },
  address: {
    zip_code: '03940',
    street_name: 'Insurgentes Sur',
    street_number: 1602,
  },
  identification: {
    type: 'DNI',
    number: '22334445'
  }
}
const payment_methods = {
  installments: 6,
  excluded_payment_types: [
    {
      id: 'atm'
    }
  ],
  excluded_payment_methods: [
    {
      id: 'diners'
    }
  ]
}
const preference = {
  items: [],
  back_urls: {
    success: '',
    pending: '',
    failure: '',
  },
  payment_methods,
  payer,
  auto_return: 'approved',
  notification_url: '',
  external_reference: 'ricardo.gambini18@outlook.com'
}

export default preference
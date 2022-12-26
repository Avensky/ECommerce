const Mongoose = require("mongoose");
const Orders = Mongoose.model('Orders');
const keys      = require('../config/keys');
const Stripe    = require('stripe');
// const ordersController = require('../controllers/ordersController');
const stripe    = Stripe(keys.stripeSecretKey);

exports.createOrder = (session, userid) => {
  //res.json({ id: session.id });
  const order = new Orders({
    sessionid                     : session.id,
    userid                        : userid || null,
    date                          : new Date(),
    payment_status                : "unpaid"  
  });
  return order;
};

exports.updateOrder =  {
};
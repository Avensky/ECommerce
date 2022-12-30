const mongoose = require("mongoose");
const Orders = mongoose.model('Orders');
const keys      = require('../config/keys');
const Stripe    = require('stripe');
// const ordersController = require('../controllers/ordersController');
const stripe    = Stripe(keys.stripeSecretKey);

exports.createOrder = (res:any, session:any, userid:any) => {
  Orders.create({
    sessionid                     : session.id,
    userid                        : userid || null,
    date                          : new Date(),
    payment_status                : "unpaid"  
  },((err:any)=>{
    if(err){
        console.log('err',err);
        //res.status(500).json('Unable to save order data!, ', err);
        res.send('Unable to save order data!');
    }
    else{
        //res.send('order data saved successfully!');
        //console.log('order data saved successfully!');
        //return res.status(200).json({ id: session.id });
        res.json({ id: session.id });
    }
  }))
};

exports.updateOrder = (res:any, session:any, line_items:any) => {
  Orders.findOneAndUpdate({'sessionid' : session.id},{
    $set:{
    // id                            : session.id,
    // userid                        : body.id,
      date                          : new Date(),
      line_items                    : line_items,
      object                        : session.object,                
      allow_promotion_codes         : session.allow_promotion_codes,
      amount_subtotal               : session.amount_subtotal,       
      amount_total                  : session.amount_total,          
      billing_address_collection    : session.billing_address_collection,
      cancel_url                    : session.cancel_url,            
      client_reference_id           : session.client_reference_id,
      currency                      : session.currency,              
      customer                      : session.customer,              
      customer_details : {
        email                       : session.customer_details.email,              
        tax_exempt                  : session.customer_details.tax_exempt,        
        tax_ids                     : session.customer_details.tax_ids              
      },
      customer_email                : session.customer_email,        
      livemode                      : session.livemode,
      locale                        : session.locale,                
      //metadata                      : session.metadata,
      mode                          : session.mode,
      payment_intent                : session.payment_intent,        
      payment_method_types          : session.payment_method_types,  
      payment_status                : session.payment_status,        
      setup_intent                  : session.setup_intent,          
      //shipping                    : session.shipping,
      shipping : {
        address: {
          city    	                : session.shipping.address.city, 
          country		                : session.shipping.address.country,
          line1	                    : session.shipping.address.line1,
          line2	                    : session.shipping.address.line2,
          postal_code 	            : session.shipping.address.postal_code,
          state   	                : session.shipping.address.state
        },
        name    	                  : session.shipping.name, 
      },        
      shipping_address_collection   : session.shipping_address_collection,
      submit_type                   : session.submit_type,
      subscription                  : session.subscription,       
      success_url                   : session.success_url,           
      total_details: { 
        amount_discount             : session.total_details.amount_discount,      
        amount_tax                  : session.total_details.amount_tax          
      }
    }
  },(err:any, doc:any)=>{
    if(err) res.status(500).json('Unable to update order data!, ', err);
    else res.status(200).json({doc});
  });
};

export {};
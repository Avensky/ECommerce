const shopController    = require("../controllers/shopController");
const ordersController  = require("../controllers/ordersController");
//const uploadController  = require("../controllers/uploadController");
const mongoose          = require('mongoose');
const Products           = mongoose.model('Products');
const Orders            = mongoose.model('Orders');
const Stripe            = require('stripe');
const keys              = require('../config/keys');
const webhookSecret     = keys.endpointSecret
const stripe            = Stripe(keys.stripeSecretKey);


module.exports = function(app) {
  app.get('/api/getProducts',     shopController.getProducts);
  app.get('/api/getProduct/:id',  shopController.getProduct);

// step 1: checkout
app.post('/api/checkout', async (req, res, event) => {
  console.log('req.body', req.body);
  // let body = req.body;
  console.log('checkout body = ', req.body);
  console.log('checkout items = ', req.body.items);

  const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      shipping_address_collection: {
          allowed_countries: ['US'],
      },
      payment_method_types: ['card'],
      line_items: req.body.items,
      mode: 'payment',
      success_url: keys.checkoutSuccessUrl,
      cancel_url: keys.checkoutCancelUrl,
  });

  let userid;
  req.body.userid
      ? userid = req.body.userid
      : null;

  const orderObj = new Orders({
      sessionid                     : session.id,
      userid                        : userid || null,
      date                          : new Date(),
      payment_status                : "unpaid"  
  });
  
  console.log('orderObj= ', orderObj);
  orderObj.save((err)=>{
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
  });
});

//app.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {
app.post('/webhook', (req, res) => {
    // choco install stripe-cli
    // stripe listen --forward-to localhost:5000/webhook
    // stripe listen --forward-to 192.168.1.19:5000/webhook
    // stripe listen --forward-to 192.168.100.17:5000/webhook
    const payload = req.rawBody;
    const sig = req.headers['stripe-signature'];
    let event;
    try { 
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret )
    } catch (err) {
      console.log('Webhook Error = '+ err.message)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }
    // Successfully constructed event
    console.log('✅ Success:', event.id);
      
    switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object;
          console.log('session completed')
          // Save an order in your database, marked as 'awaiting payment'
          shopController.updateSession(req,res, session);

          // Check if the order is paid (e.g., from a card payment)
          //
          // A delayed notification payment will have an `unpaid` status, as
          // you're still waiting for funds to be transferred from the customer's
          // account.
          if (session.payment_status === 'paid') {
            //shopController.updateSession(req,res, session);
            shopController.fulfillOrder(req,res, session);
          }
    
          break;
        }
    
        case 'checkout.session.async_payment_succeeded': {
          console.log('session async_payment_succeeded')
          const session = event.data.object;

          // Fulfill the purchase...
          //fulfillOrder(session);
    
          break;
        }
    
        case 'checkout.session.async_payment_failed': {
          const session = event.data.object;
          console.log('session async_payment_failed')
          // Send an email to the customer asking them to retry their order
          //emailCustomerAboutFailedPayment(session);
    
          break;
        }
        default :{
          res.send();
        }
      };
  });


//    app.post("/api/addImage", 
//    uploadController.upload.single('avatar'), 
//    shopController.createProduct);

//    app.get("/api/getProducts", shopController.getProducts);

// app.get("/:id", shopController.getProductById);
// app.delete("/:id", shopController.removeProduct);

//    app.post('/api/addProduct',(req,res) => {        //add a new item
//        // const { title, author, content} = req.body;
//        const itemObj = new Product({
//            name        : req.body.name,
//            desc        : req.body.desc,
//        //        itemId : req.body.itemid,
//            price       : req.body.price,
//            image       : req.body.image,
//            quantity    : req.body.quantity,
//            type        : req.body.type,
//            featured    : req.body.featured,
//            date        : new Date()
//        })
//        // itemObj.save((err)=>{
//        //     if(err){
//        //     console.log(err);
//        //     res.send('Unable to save item data!');
//        //     }
//        //     else
//        //     res.send('item data saved successfully!');
//        // })
//    });
//
//    app.get('/api/getitemDetails/:itemid',(req,res)=>{              //get a item details
//    Product.find({_id : req.params.itemid},{},(err,doc)=>{
//        if(doc)
//            res.json(doc);
//        else {
//            res.status(404).send('Ops!Detail not found');
//        }
//    })
//    });   
//
//    app.get('/api/getitemsbytype/:type',(req,res)=>{              //get a item details
//    Product.find({type : req.params.type},{},(err,doc)=>{
//        if(doc)
//            res.json(doc);
//        else {
//            res.status(404).send('Ops! Items not found');
//        }
//    })
//    });   
//
//
//    app.get('/api/getitemSearch/',(req,res)=>{              //get a item details
//    Product.find({},(err,doc)=>{
//        if(doc)
//            res.json(doc);
//        else {
//            res.status(404).send('Ops!Detail not found');
//        }
//    })
//    });   
//
//
//    app.post('/api/updateitem',(req,res)=>{          //update a item data
//        Product.findOneAndUpdate({
//            itemId : req.body.id
//        },{
//            $set:{
//                name : req.body.name,
//                age : req.body.age,
//                relatives : req.body.relatives,
//                bio : req.body.bio
//            }
//        },(err,doc)=>{
//            if(doc)
//                res.send('Product updated successfully!');
//            else {
//                res.err(err.message);
//            }
//        })
//    });
//
//    app.delete('/api/deleteitem/:itemid',(req,res)=>{           //delete a perticular item
//        Product.findOneAndRemove({_id : req.params.itemid},{},(err,doc)=>{
//            if(doc)
//                res.json(doc);
//            else {
//                res.status(404).send('Ops! Product not found');
//            }
//        })
//    });
}


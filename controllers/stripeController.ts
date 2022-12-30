const keys              = require('../config/keys');
const Stripe            = require('stripe');
const stripe            = Stripe(keys.stripeSecretKey);
const webhookSecret     = keys.endpointSecret

exports.webhook = (req:any, res:any) => {
    // choco install stripe-cli
    // stripe listen --forward-to localhost:5000/webhook
    // stripe listen --forward-to 192.168.1.19:5000/webhook
    // stripe listen --forward-to 192.168.100.17:5000/webhook
    const payload = req.rawBody;
    const sig = req.headers['stripe-signature'];
    let event;
    try { 
        event = stripe.webhooks.constructEvent(payload, sig, webhookSecret )
    } catch (err:any) {
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
};

export {};
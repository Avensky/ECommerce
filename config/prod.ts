module.exports = {
    //server stuffs
    port : process.env.PORT,
    ipAdress : "127.0.0.1",
    mongoURI : process.env.MONGO_URI,

    //stripe stuffs
    webhookSecret           : process.env.ENDPOINT_SECRET,
    stripePublishableKey    : process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey         : process.env.STRIPE_SECRET_KEY,
    taxRates                : process.env.TAX_RATES,
    checkoutSuccessUrl      : "https://www.avensky.com/home",
    checkoutCancelUrl       : "https://www.avensky.com/cart",

    //email stuffs
    emailUsername           : process.env.EMAIL_USERNAME,
    emailPassword           : process.env.EMAIL_PASSWORD,
    emailHost               : process.env.EMAIL_HOST,
    emailPort               : process.env.EMAIL_PORT,
    emailFrom               : process.env.EMAIL_FROM,
    
    sengridUsername         : process.env.SENDGRID_USERNAME,
    sengridPassword         : process.env.SENDGRID_PASSWORD,
    secretKey               : process.env.SECRET_KEY,

    //GoogleAuth
    googleClientID          : process.env.AVENSKY_GOOGLE_CLIENT_ID,
    googleClientSecret      : process.env.AVENSKY_GOOGLE_CLIENT_SECRET,
    googleCallbackURL       : "https://www.avensky.com/api/google/callback/",

    facebookClientID        : process.env.FACEBOOK_CLIENT_ID,
    facebookClientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
    facebookCallbackURL     : "https://www.urielzacarias.com/api/facebook/callback/",

    twitterConsumerKey      : process.env.TWITTER_CONSUMER_KEY,
    twitterConsumerSecret   : process.env.TWITTER_CONSUMER_SECRET,
    twitterCallbackURL      : "https://www.urielzacarias.com/api/twitter/callback/",
};
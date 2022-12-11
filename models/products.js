const mongoose  = require('mongoose');

const productsSchema = new mongoose.Schema({
    priceid: {
        type: String,
        required: [false, "Please include the product id"]
    },
    name: {
        type: String,
        required: [false, "Please include the product name"]
    },
    desc: {
        type: String,
        required: [false, "Please include the product description"]
    },
    price: {
        type: Number,
        required: [false, "Please include the product price"]
    },
    imageName: {
        type: String,
        required: false
    },
    imageData: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    sold: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    featured: {
        type: String,
        required: false
    }
});

// create the model and export it
const Product = mongoose.model("Products", productsSchema);
module.exports = Product;

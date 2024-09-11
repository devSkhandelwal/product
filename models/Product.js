const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    sizes: [{
        size: {
            type: String,
        },
        colors: [{
            color: {
                type: String,
            },
            quantity: {
                type: Number
            }
        }]
    }]
});

const Product = mongoose.model('Product', productSchema)
module.exports = Product;



// Product Schema:

// Fields:
// productName: String(name of the product)
// sizes: Array of objects, where each object represents a size and contains an array of colors.Each color will also have a quantity associated with it.
//     size: String
// colors: Array of objects
// color: String
// quantity: Number
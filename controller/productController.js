const Product = require("../models/product");


exports.insertProduct = async (req, res) => {
    console.log(req.body)
    const { name, category, sizes } = req.body

    await Product.create({
        name, category, sizes
    })

    res.status(201).json({
        message: "Product added successfully."
    })
}

exports.getProduct = async (req, res) => {
    try {

        // const products = await Product.find({})
        const products = await Product.aggregate([
            {
                $match: {
                    "sizes.colors.quantity": { $gt: 0 }
                }
            },
            {
                $project: {
                    product: {
                        $map: {
                            input: "$sizes",
                            as: "s",
                            in: {
                                _id: "$$s._id",
                                size: "$$s.size",
                                colors: {
                                    $filter: {
                                        input: "$$s.colors",
                                        as: 'c',
                                        cond: {
                                            $gt: [
                                                "$$c.quantity", 0
                                            ]
                                        }
                                    }
                                }

                            }
                        }

                    }
                }
            }

        ])

        res.status(200).json({
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        })
    }
}

exports.buyProduct = async (req, res) => {
    const { colorId, buyQuantity } = req.body;

await Product.updateOne(
    {
        "sizes.colors._id": new mongoose.Types.ObjectId(colorId)
    },
    {
        $inc: {
            "sizes.$[].colors.$[ele].quantity": -buyQuantity
        }
    },
    {
        arrayFilters: [
            { "ele._id": new mongoose.Types.ObjectId(colorId) }
        ]
    }
)

     res.status(200).json({
            message: "updated."
        })


}


// Get all products:
// Retrieves all products where the quantity of any color is greater than 0.
// Buy a product:
// Accepts a payload with the product name, size, color, and quantity.It deducts the given quantity from the selected product.
// Group products by category:
// Returns products grouped by category, but only includes products where the quantity of each size / color is greater than 0. Removes colors / sizes where the quantity is less than 1.
// Cron Job:

// A scheduled job that checks all products and sends a notification to the admin when the quantity of any product(size / color) drops below 1


// utkarshgubrealay.eminence@gmail.com

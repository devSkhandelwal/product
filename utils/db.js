const mongoose = require('mongoose');



const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect("mongodb+srv://skhandelwal:12344321@cluster0.ls0sf.mongodb.net/")

        console.log(`mongodb connected to ${connection.host}`)

    } catch (error) {
        console.log(error)
        prcess.exit(1)
    }
}

module.exports = connectDB
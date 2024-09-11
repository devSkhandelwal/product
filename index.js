const express = require("express");
const connectDB = require("./utils/db");
const productRoutes = require("./routes/productRoutes")

const app = express();


connectDB();

app.use(express.json())
app.use("/api/v1/products", productRoutes)

app.listen(5000, () => {
    console.log("server is listening on port 5000")
})

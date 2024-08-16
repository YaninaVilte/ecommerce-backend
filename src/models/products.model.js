import mongoose from "mongoose";

const productSchema = new mongoose.Schema ({
    title: String,
    description: String,
    price: Number,
    code: String,
    stock: Number,
    category: Number
})

const ProductsModel = mongoose.model("Productos", productSchema);

export default ProductsModel;
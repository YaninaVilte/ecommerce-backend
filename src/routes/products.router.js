import { Router } from "express";
import { productManager } from "../app.js";
import ProductsModel from "../models/products.model.js";

// en vez de producManager va a ser ProductsModel

const productsRouter = Router();


productsRouter.get("/", async (req, res) => {
    const productsList = await ProductsModel.find();
    res.send(productsList);
})

// productsRouter.get("/", async (req, res) => {
//     const limit = req.query.limit
//     try {
//         const arrayProducts = await ProductsModel.getProducts();
//         if (limit) {
//             res.send(arrayProducts.slice(0, limit));
//         } else {
//             res.send(arrayProducts);
//         }
//     } catch (error) {
//         res.status(500).send("Error interno del servidor");
//     }
// });


// productsRouter.get("/:pid", async (req, res) => {
//     const id = parseInt(req.params.pid);
//     try {
//         const product = await ProductsModel.getProductById(id);
//         if (!product) {
//             res.status(404).send("Producto no encontrado");
//         } else {
//             res.send(product);
//         }
//     } catch (error) {
//         res.status(500).send("Error el id en los productos");
//     }
// });


// productsRouter.post("/", async (req, res) => {
//     const newProduct = req.body;
//     try {
//         const addedProduct = await ProductsModel.addProduct(newProduct);
//         if (addedProduct) {
//             res.status(201).json({ message: "Producto agregado exitosamente", product: addedProduct });
//         } else {
//             res.status(400).send("No se pudo agregar el producto");
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ status: "error", message: error.message });
//     }
// });


// productsRouter.put("/:pid", async (req, res) => {
//     const { pid } = req.params;
//     const { title, description, price, code, stock, status = true, category } = req.body;
//     try {
//         await ProductsModel.updateProduct(Number(pid), { title, description, price, code, stock, status, category });
//         res.json({ message: "Producto actualizado exitosamente" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Error al intentar editar producto");
//     }
// });


// productsRouter.delete("/:pid", async (req, res) => {
//     const { pid } = req.params;

//     try {
//         await ProductsModel.deleteProduct(Number(pid));
//         res.send("Producto eliminado exitosamente");
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Error al eliminar producto");
//     }
// });



export default productsRouter;
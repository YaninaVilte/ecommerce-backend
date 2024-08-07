import { Router } from "express";
import { productManager } from "../app.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
    const limit = req.query.limit
    try {
        const arrayProducts = await productManager.getProducts();
        if (limit) {
            res.send(arrayProducts.slice(0, limit));
        } else {
            res.send(arrayProducts);
        }
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
});


productsRouter.get("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    try {
        const product = await productManager.getProductById(id);
        if (!product) {
            res.status(404).send("Producto no encontrado");
        } else {
            res.send(product);
        }
    } catch (error) {
        res.status(500).send("Error el id en los productos");
    }
});


productsRouter.post("/", async (req, res) => {
    const newProduct = req.body;
    try {
        const addedProduct = await productManager.addProduct(newProduct);
        if (addedProduct) {
            res.status(201).json({ message: "Producto agregado exitosamente", product: addedProduct });
        } else {
            res.status(400).send("No se pudo agregar el producto");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message });
    }
});


productsRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const { title, description, price, code, stock, status = true, category } = req.body;
    try {
        await productManager.updateProduct(Number(pid), { title, description, price, code, stock, status, category });
        res.json({ message: "Producto actualizado exitosamente" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al intentar editar producto");
    }
});


productsRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
        await productManager.deleteProduct(Number(pid));
        res.send("Producto eliminado exitosamente");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al eliminar producto");
    }
});



export default productsRouter;
import { Router } from "express";
import CartManager from "../dao/db/cart-manager-db.js";


const cartManager = new CartManager();
const cartsRouter = Router();


cartsRouter.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.json(newCart);
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})

cartsRouter.get("/:cid", async (req, res) => {
    let cartID = req.params.cid;

    try {
        const cart = await cartManager.getCartByID(cartID);
        res.json(cart.productos);
    } catch (error) {
        res.status(500).send("Error al obtener los productos del carrito");
    }
})

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    let cartID = req.params.cid;
    let productID = req.params.pid;
    let quantity = req.body.quantity || 1;

    try {
        const updatedCart = await cartManager.addProductsToCart(cartID, productID, quantity);
        res.json(updatedCart.productos);
    } catch (error) {
        res.status(500).send("Error al agregar un producto al carrito");
    }
})

// ir viendo desde aca

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
    const { pid, cid } = req.params;
    try {
        const cart = await cartManager.getCartByID(cid);
        if (!cart) {
            return res.status(404).send("Carrito no encontrado");
        }

        // Busca el índice del producto dentro del carrito
        const productIndex = cart.productos.findIndex(product => product.product.toString() === pid);
        if (productIndex === -1) {
            return res.status(404).send("Producto no encontrado en el carrito");
        }

        // Elimina el producto del carrito
        cart.productos.splice(productIndex, 1);

        // Guarda el carrito actualizado
        await cart.save();

        res.send("Producto eliminado exitosamente del carrito");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al eliminar producto del carrito");
    }
});

// VERVERVER PUT api / carts /:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba. No entiendo que debe hacer aca

cartsRouter.put("/:cid", async (req, res) => {

});


// PUT api / carts /: cid / products /:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    // Verificar que la cantidad sea válida
    if (quantity === undefined || quantity <= 0) {
        return res.status(400).send("Cantidad inválida");
    }

    try {
        // Llama al método para actualizar la cantidad del producto en el carrito
        const updatedCart = await cartManager.updateProductQuantity(cid, pid, quantity);
        res.json(updatedCart.productos);  // Devolver los productos actualizados del carrito
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar la cantidad del producto");
    }
});

cartsRouter.delete("/:cid", async (req, res) => {
    const { cid } = req.params;

    try {
        const clearedCart = await cartManager.clearCart(cid);
        res.json({ message: "Carrito vaciado exitosamente", cart: clearedCart });
    } catch (error) {
        console.error("Error al vaciar el carrito:", error);
        res.status(500).send("Error al vaciar el carrito");
    }
});


export default cartsRouter;
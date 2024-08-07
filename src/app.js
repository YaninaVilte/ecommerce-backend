import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import http from "http";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

import ProductManager from "./managers/product-manager.js";
import CartManager from "./managers/cart-manager.js";

const app = express();
const PORT = 8080;

const productManager = new ProductManager("./src/data/products.json");
const cartManager = new CartManager("./src/data/carts.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT}`);
});

const io = new Server(httpServer);

io.on("connection", async (socket) => {
    socket.on("message", (data) => {
        console.log("Nuevo cliente");
    });
    socket.emit("products", await productManager.getProducts());

    socket.on("deleteProduct", async (productId) => {
        await productManager.deleteProduct(productId);
        socket.emit("products", await productManager.getProducts());
    });

    socket.on("productForm", async (data) => {
        const { title, description, code, price, stock, category, thumbnails } = data;
        await productManager.addProduct({ title, description, code, price, stock, category, thumbnails });
        socket.emit("products", await productManager.getProducts());
    });
});

export { productManager };
export { cartManager };

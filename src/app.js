import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import http from "http";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import mongoose from "mongoose";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));


app.engine("handlebars", engine({
    extname: ".handlebars",
    defaultLayout: "main",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);


const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT}`);
});

mongoose.connect("mongodb+srv://yanivilte:coderhouse@cluster0.jyqtcqx.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Nos conectamos a la BD correctamente"))
    .catch((error) => console.log("Tenemos un error de conexión en la BD", error))
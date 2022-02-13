import { Router } from "express";
import auth from './../middlewares/auth.js';
import getProducts from "../controllers/product/getProducts.js";
import addProduct from './../controllers/product/addProduct.js';
import deleteProduct from './../controllers/product/deleteProduct.js';
import updateProduct from './../controllers/product/updateProduct.js';
import addToFavourites from './../controllers/product/addToFavourites.js';
import removeFromFavourites from './../controllers/product/removeFromFavourites.js';
import getById from './../controllers/product/getById.js';

const product = Router();

product.get("/:id", getById);
product.post("/",getProducts);
product.post("/add", auth, addProduct);
product.patch("/", auth, updateProduct);
product.patch("/favourites", auth, addToFavourites);
product.patch("/removeFavourites", auth, removeFromFavourites);
product.delete("/", auth, deleteProduct);

export { product as productRouter };
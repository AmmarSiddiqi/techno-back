import { Router } from "express";
import auth from './../middlewares/auth.js';
import getProducts from "../controllers/product/getProducts.js";
import addProduct from './../controllers/product/addProduct.js';
import deleteProduct from './../controllers/product/deleteProduct.js';
import updateProduct from './../controllers/product/updateProduct.js';
import addToFavourites from './../controllers/product/addToFavourites.js';
import removeFromFavourites from './../controllers/product/removeFromFavourites.js';
import getById from './../controllers/product/getById.js';
import verification from './../middlewares/verification.js';

const product = Router();

product.get("/:id", getById);
product.post("/",getProducts);
product.post("/add", auth, verification, addProduct);
product.patch("/", auth, verification, updateProduct);
product.patch("/favourites", auth, verification, addToFavourites);
product.patch("/removeFavourites", auth, verification, removeFromFavourites);
product.delete("/", auth, verification, deleteProduct);

export { product as productRouter };
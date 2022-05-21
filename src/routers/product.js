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
import getFavourites from './../controllers/product/getFavourites.js';
import getMyAds from './../controllers/product/getMyAds.js';
import visible from "../controllers/product/status.js";
import getCategoryWise from "../controllers/product/getCategoryWise.js";
import getFreshProducts from "../controllers/product/getFreshProducts.js";

const product = Router();

product.get("/myads", auth, getMyAds);
product.get("/:id", getById);
product.get("/categoryWise/:category", getCategoryWise);
product.post("/",getProducts);
product.post("/freshProducts",getFreshProducts);
product.post("/add", auth, verification, addProduct);
product.post("/status", auth, verification, visible);
product.post("/getFavourites", auth, verification, getFavourites);
product.patch("/", auth, verification, updateProduct);
product.patch("/favourites", auth, verification, addToFavourites);
product.patch("/removeFavourites", auth, verification, removeFromFavourites);
product.delete("/:id", auth, verification, deleteProduct);

export { product as productRouter };
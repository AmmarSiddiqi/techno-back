import express from "express";
import fileUpload from 'express-fileupload';
import cors from "cors";
import productionMiddlewares from "./productionMiddlewares.js";
import { BID_API_V1, production, PRODUCT_API_V1, USER_API_V1,CATEGORY_API_V1 } from "../constants/constants.js";
import { userRouter } from "../routers/user.js";
import { productRouter } from "../routers/product.js";
import { bidRouter } from "../routers/bid.js";
import { categoryRouter } from "../routers/category.js";

const importRoutes = (app) => {
    app.use(express.json());
    app.use(fileUpload());
    app.use(cors({ origin: [process.env.origin, process.env.origin2] }))
    production && productionMiddlewares(app);
    app.use(USER_API_V1, userRouter);
    app.use(PRODUCT_API_V1, productRouter);
    app.use(BID_API_V1, bidRouter);
    app.use(CATEGORY_API_V1,categoryRouter);
}

export default importRoutes;

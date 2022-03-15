import express from "express";
import add from '../controllers/category/add.js';
import get from './../controllers/category/get.js';

const router = express.Router();

router.get("/", get);
router.post("/", add);

export { router as categoryRouter };